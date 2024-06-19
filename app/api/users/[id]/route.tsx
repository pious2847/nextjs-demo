import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/prisma/client";
import schema from "../schema";

interface Props{
    params: {id: string}
}
export async function GET(request: NextRequest, {params:{id}}:Props){
    const user = await prisma.user.findUnique({where: {id: parseInt(id)}})
    if (!user)
        return NextResponse.json({error: 'No such product'}, {status: 404})

    return NextResponse.json({user: user})
}


export async function PUT(request: NextRequest){
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