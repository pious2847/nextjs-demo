import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

interface Props{
    params: {id: string}
}
export async function GET(request: NextRequest, {params:{id}}:Props){
    const product = await prisma.products.findUnique({where: {id: parseInt(id)}})
    if (!product)
        return NextResponse.json({error: 'No such product'}, {status: 404})

    return NextResponse.json({ product})
}

export async function PUT(request: NextRequest, {params:{id}}:Props){
    const body = await request.json();
    const valiator = schema.safeParse(body);

    if(!valiator.success)
     return NextResponse.json(valiator.error.errors, {status: 400})

    const product = await prisma.products.findUnique({
        where: {id: parseInt(id)}
    })
    if (!product) {
     return NextResponse.json({error: 'product not found '}, {status: 400})
        
    }
  const updatedproduct =  await prisma.products.update({
        where:{id: product.id},
        data:{
            title: body.title,
            price: body.name,
        }
    });

    return NextResponse.json(updatedproduct, {status: 201})

}

export async function DELETE(request: NextRequest, {params:{id}}:Props){
    const body = await request.json();
    const valiator = schema.safeParse(body);

    if(!valiator.success)
     return NextResponse.json(valiator.error.errors, {status: 400})

    const product = await prisma.products.findUnique({
        where: {id: parseInt(id)}
    })
    
    if (!product) {
     return NextResponse.json({error: 'product not found '}, {status: 400})
        
    }
  await prisma.products.delete({
        where:{id: product.id}, 
    });

    return NextResponse.json({message: 'product removed sucessfully'}, {status: 201})

}