import {PrismaClient} from "@prisma/client";
import {AuthOptions} from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {getCsrfToken} from "next-auth/react";
import {SiweMessage} from "siwe";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import randomName from "src/lib/utils/radom-name";

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "web3",
            name: "web3",
            credentials: {
                message: {label: "Message", type: "text"},
                signedMessage: {label: "Signed Message", type: "text"},
            },
            async authorize(credentials, req) {
                if (!credentials?.signedMessage || !credentials?.message) {
                    return null;
                }

                try {
                    const siwe = new SiweMessage(JSON.parse(credentials?.message));
                    const result = await siwe.verify({
                        signature: credentials.signedMessage,
                        nonce: await getCsrfToken({req}),
                    });

                    if (!result.success) throw new Error("Invalid Signature");

                    if (result.data.statement !== process.env.NEXT_PUBLIC_SIGNIN_MESSAGE)
                        throw new Error("Statement Mismatch");

                    if (new Date(result.data.expirationTime as string) < new Date())
                      throw new Error("Signature Already expired");

                    return {
                        id: siwe.address,
                    };

                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
    adapter: PrismaAdapter(prisma),

    session: {strategy: "jwt"},

    debug: process.env.NODE_ENV === "development",

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async session({session, token}: { session: any; token: any }) {
            let user = await prisma.user.findUnique({
                where: {
                    address: token.sub
                }
            })

            if (!user) {
                user = await prisma.user.create({
                    data: {
                        address: token.sub,
                        nickName: randomName.getName(),
                        avatar: '/assets/logo.png'
                    }
                })
            }
            session.user.avatar = user?.avatar
            session.user.nickName = user?.nickName
            session.user.address = token.sub;
            session.user.token = token;
            return session;
        },
    },
    pages: {
        signIn: "/test/auth"
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
