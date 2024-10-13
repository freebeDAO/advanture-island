import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Missing token" }, { status: 401 });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    const userId = (decoded as any).userId;

    const formData = await req.formData();
    const nickname = formData.get("nickname") as string;
    const avatarFile = formData.get("avatar") as File;

    if (!nickname || !avatarFile) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }
    const fileName = avatarFile.name ? avatarFile.name : "default-avatar.png";

    // Directory where avatars will be stored
    const uploadDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      String(userId)
    );

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });
    let now = Date.now();

    // Generate avatar file path
    const avatarFilePath = path.join(uploadDir, `avatar-${now}-${fileName}`);

    // Convert the File to ArrayBuffer to save it
    const arrayBuffer = await avatarFile.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Save the file to disk
    await fs.writeFile(avatarFilePath, buffer);

    // Store the relative path to the image in the database
    const avatarUrl = `/uploads/${userId}/avatar-${now}-${fileName}`;

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        nickname,
        avatar: avatarUrl,
      },
    });

    return NextResponse.json({ code: 0, data: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating profile", error },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};
