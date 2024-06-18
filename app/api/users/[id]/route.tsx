import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/prisma/client";

interface Props{
    params: {id: string}
}
export async function GET(request: NextRequest, {params:{id}}:Props){
    const user = await prisma.user.findUnique({where: {id: parseInt(id)}})
    if (!user)
        return NextResponse.json({error: 'No such product'}, {status: 404})

    return NextResponse.json({user: user})
}