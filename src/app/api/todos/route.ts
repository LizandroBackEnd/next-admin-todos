import { NextResponse, NextRequest } from "next/server";  
import prisma from "@/app/lib/prisma";
 
export async function GET(request: Request) {  
    const todos = await prisma.todo.findMany(); 
     
    return NextResponse.json(todos);
}