import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/prisma/client";

interface Props{
    params: {id: string}
}
export async function GET(request: NextRequest, {params:{id}}:Props){
    const product = await prisma.products.findUnique({where: {id: parseInt(id)}})
    if (!product)
        return NextResponse.json({error: 'No such product'}, {status: 404})

    return NextResponse.json({ product})
}