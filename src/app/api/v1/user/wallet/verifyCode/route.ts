import { NextResponse, NextRequest } from "next/server";

// In-memory store for wallet verification codes
let walletVerificationCodes: { [key: string]: string } = {};

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
    walletVerificationCodes[wallet] = verificationCode;

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
