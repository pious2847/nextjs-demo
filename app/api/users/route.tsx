import prisma from "@/prisma/client";
import { data } from "autoprefixer";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest){
    return NextResponse.json(
        [
            {
                'id': 1,
                'product': 'Milk',
                'price': 3.5
            },
            {
                'id': 1,
                'product': 'Breadcake',
                'price': 3.70
            },
        ]
    )
}

export async function POST(request: NextRequest){
    const body = await request.json();

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