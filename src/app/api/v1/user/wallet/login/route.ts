import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nacl from "tweetnacl";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { wallet, signature, publicKey } = await req.json();

    if (!wallet || !signature || !publicKey) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }
    // 从数据库中获取验证码
    const verificationRecord = await prisma.walletVerificationCode.findUnique({
      where: { wallet },
    });

    // Verify the wallet signature using NaCl
    if (!verificationRecord) {
      return NextResponse.json(
        { message: "No verification code found for this wallet" },
        { status: 400 }
      );
    }

    const verificationCode = verificationRecord.code;

    const message = new TextEncoder().encode(verificationCode);
    const publicKeyBytes = new Uint8Array(Buffer.from(publicKey, "hex"));
    const signatureBytes = new Uint8Array(Buffer.from(signature, "hex"));

    if (!nacl.sign.detached.verify(message, signatureBytes, publicKeyBytes)) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    // Find or create the user in the database
    let user = await prisma.user.findUnique({ where: { address: wallet } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          address: wallet,
          nickname: "Anonymous",
          avatar: null,
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    return NextResponse.json({ code: 0, data: token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
