import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import Email from "next-auth/providers/email";
import prisma from "@/prisma/client";

const Schema = z.object({
    email: z.string().email(),
    password: z.string().min(4)
})

export async function POST(request: NextRequest){
    const body = await request.json();

    const validation = Schema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.errors , {status: 400}, )
    }

    const user = await prisma.user.findUnique({
        where: {email: body.email}
    })

    if (user) {
        return NextResponse.json({error: 'User Already Exist'} , {status: 400}, )
    }

    const hashedpass = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
       data:{ 
        email: body.email,
        hashedPass: hashedpass
    }
    })

    return NextResponse.json({email: newUser.email})
}