import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, signJwt, TOKEN_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check regular User table first
    let user = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    let role = user?.role || "CLIENT";
    let userName = user?.name || "";
    let userId = user?.id || "";

    // If not found in user table, check AdminUser table
    if (!user) {
      const admin = await prisma.adminUser.findUnique({
        where: { email: cleanEmail },
      });
      if (admin && comparePassword(password, admin.password)) {
        userId = admin.id;
        userName = admin.name;
        role = "SUPER_ADMIN";
        
        const token = signJwt({
          userId: admin.id,
          email: admin.email,
          name: admin.name,
          role: "SUPER_ADMIN",
        });

        const response = NextResponse.json({
          success: true,
          user: {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: "SUPER_ADMIN",
          },
        });

        response.cookies.set(TOKEN_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        });

        return response;
      }
      return NextResponse.json(
        { error: "Invalid email or password credentials" },
        { status: 401 }
      );
    }

    // Verify password for regular user
    const isValid = comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password credentials" },
        { status: 401 }
      );
    }

    const token = signJwt({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });

    response.cookies.set(TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during login" },
      { status: 500 }
    );
  }
}
