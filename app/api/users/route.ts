// pages/api/users.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

interface UserRequestBody {
  name: string;
  email: string;
  gender: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: UserRequestBody = await req.json();

    // Validate the request body
    if (!validateRequestBody(body)) {
      return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
    }

    // Find existing user by email
    let user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (user) {
      // Update user if name or gender has changed
      if (user.name !== body.name || user.gender !== body.gender) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { name: body.name, gender: body.gender },
        });
      }
    } else {
      // Create new user if not found
      user = await prisma.user.create({
        data: { name: body.name, email: body.email, gender: body.gender },
      });
    }

    return NextResponse.json(user, { status: user ? 200 : 201 });
  } catch (error) {
    console.error("Error handling user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Validation function
const validateRequestBody = (body: UserRequestBody): boolean => {
  return body.name.trim() !== '' && body.email.trim() !== '' && body.gender.trim() !== '';
};
