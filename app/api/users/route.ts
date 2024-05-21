import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/client";

interface UserRequestBody {
    name: string;
    email: string;
    gender: string;
}

const validateRequestBody = (body: UserRequestBody): boolean => {
    return body.name !== '' && body.email !== '' && body.gender !== '';
};

const handleUser = async (body: UserRequestBody): Promise<UserRequestBody | null> => {
    const { name, email, gender } = body;

    let user = await prisma.user.findFirst({
        where: { email },
    });

    if (user) {
        if (user.name !== name || user.gender !== gender) {
            user = await prisma.user.update({
                where: { id: user.id },
                data: { name, gender },
            });
        }
        return user;
    } else {
        user = await prisma.user.create({
            data: { name, email, gender },
        });
        return user;
    }
};


export async function POST(req: NextRequest) {
    try {
        const body: UserRequestBody = await req.json();

        // Validate the request body
        if (!validateRequestBody(body)) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Handle user creation or update
        const user = await handleUser(body);
        return user ? NextResponse.json(user, { status: 200 }) :
            NextResponse.json({ error: "User not found" }, { status: 404 });

    } catch (error) {
        console.error("Error handling user:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}