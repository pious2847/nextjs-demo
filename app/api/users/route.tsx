import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import  schema  from "./schema";
import { error } from "console";

export async function GET(request: NextRequest){
    const user = await prisma.user.findMany();
    return NextResponse.json(user, {status: 200})
}

export async function POST(request: NextRequest){
    const body = await request.json();
    const valiator = schema.safeParse(body);

    if(!valiator.success)
     return NextResponse.json(valiator.error.errors, {status: 400})
    const existinguser = await prisma.user.findUnique({
        where: {email: body.email}
    })
    if (existinguser) {
     return NextResponse.json({error: 'User alreadu exist'}, {status: 400})
        
    }
  const user =  await prisma.user.create({
        data:{
            name: body.name,
            email: body.email,
            follows: body.follows,
            isActive: body.isActive,
        }
    });

    return NextResponse.json(user, {status: 201})

}