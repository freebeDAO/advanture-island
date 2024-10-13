import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();

    if (!wallet) {
      return NextResponse.json(
        { message: "Missing wallet address" },
        { status: 400 }
      );
    }

    // Generate a random verification code for the wallet
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // 将验证码持久化到数据库
    await prisma.walletVerificationCode.upsert({
      where: { wallet },
      update: { code: verificationCode, createdAt: new Date() },
      create: { wallet, code: verificationCode },
    });

    return NextResponse.json(
      { code: 0, data: { verifyCode: verificationCode } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error generating verification code" },
      { status: 500 }
    );
  }
}
