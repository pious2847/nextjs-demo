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