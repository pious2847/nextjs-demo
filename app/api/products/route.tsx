import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import  schema  from "./schema";

export async function GET(request: NextRequest){
    const product = await prisma.products.findMany();
    return NextResponse.json(product, {status: 200})
}

export async function POST(request: NextRequest){
    const body = await request.json();
    const valiator = schema.safeParse(body);

    if(!valiator.success)
     return NextResponse.json(valiator.error.errors, {status: 400})
    
  const product =  await prisma.products.create({
        data:{
            title: body.title,
            price: body.price,
            category: body.category,
            description: body.description,
            rating: parseFloat(body.rating)
        }
    });

    return NextResponse.json(product, {status: 201})

}