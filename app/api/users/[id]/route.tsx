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

export async function PUT(request: NextRequest, {params:{id}}:Props){
    const body = await request.json();
    const valiator = schema.safeParse(body);

    if(!valiator.success)
     return NextResponse.json(valiator.error.errors, {status: 400})

    const user = await prisma.user.findUnique({
        where: {id: parseInt(id)}
    })
    if (!user) {
     return NextResponse.json({error: 'User not found '}, {status: 400})
        
    }
  const updateduser =  await prisma.user.update({
        where:{id: user.id},
        data:{
            name: body.name,
            email: body.email,
        }
    });

    return NextResponse.json(updateduser, {status: 201})

}

export async function DELETE(request: NextRequest, {params:{id}}:Props){
    const body = await request.json();
    const valiator = schema.safeParse(body);

    if(!valiator.success)
     return NextResponse.json(valiator.error.errors, {status: 400})

    const user = await prisma.user.findUnique({
        where: {id: parseInt(id)}
    })
    
    if (!user) {
     return NextResponse.json({error: 'User not found '}, {status: 400})
        
    }
  await prisma.user.delete({
        where:{id: user.id}, 
    });

    return NextResponse.json({message: 'User removed sucessfully'}, {status: 201})

}