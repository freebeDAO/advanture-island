import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ethers } from 'ethers';
import { prisma, rateLimiter } from 'src/lib/utils';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Wallet',
      credentials: {
        address: { label: "钱包地址", type: "text" },
        signature: { label: "签名", type: "text" },
        nonce: { label: "随机数", type: "text" },
      },
      async authorize(credentials, req) {
        const { address, signature, nonce } = credentials;

        if (!address || !signature || !nonce) {
          await rateLimiter.increment(`fail_${address}`);
          throw new Error('请提供钱包地址、签名和随机数');
        }

        try {
          // 从数据库获取存储的 nonce
          const storedNonce = await prisma.nonce.findUnique({
            where: { address }
          });

          if (!storedNonce || storedNonce.nonce !== nonce) {
            await rateLimiter.increment(`fail_${address}`);
            throw new Error('无效的 nonce');
          }

          // 使用 ethers 验证签名
          const signerAddress = ethers.verifyMessage(nonce, signature);
          if (signerAddress.toLowerCase() !== address.toLowerCase()) {
            await rateLimiter.increment(`fail_${address}`);
            throw new Error('签名验证失败');
          }

          // 验证成功后，删除使用过的 nonce
          await prisma.nonce.delete({ where: { address } });

          let user = await prisma.user.findUnique({
            where: { address },
          });

          if (!user) {
            user = await prisma.user.create({
              data: {
                address,
                nickname: `User_${address.slice(0, 6)}`,
                avatar: '',
              },
            });
          }

          // 认证成功，重置速率限制
          await rateLimiter.delete(`fail_${address}`);

          return { 
            id: user.id, 
            address: user.address, 
            nickname: user.nickname, 
            avatar: user.avatar 
          };

        } catch (error) {
          // 确保在任何错误发生时都增加失败计数
          await rateLimiter.increment(`fail_${address}`);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 天
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.address = user.address;
        token.nickname = user.nickname;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as number;
        session.user.address = token.address as string;
        session.user.nickname = token.nickname as string;
        session.user.avatar = token.avatar as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
