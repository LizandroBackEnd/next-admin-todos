import { NextResponse, NextRequest } from "next/server";  
import prisma from "@/app/lib/prisma"; 
import * as yup from 'yup';
 
export async function GET(request: Request) {   
    const { searchParams } = new URL(request.url) 
    const take = Number(searchParams.get('take') ?? '10');  
    const skip = Number(searchParams.get('skip') ?? '0'); 
     
    if (isNaN(skip)) { 
        return NextResponse.json({ message: 'Skip tiene que ser un número'});
    }
     
    
    if ( isNaN(take)) { 
        return NextResponse.json({ message: 'Take tiene que ser un número'}, { status: 400});
    }

    const todos = await prisma.todo.findMany({ take, skip, }); 
     
    return NextResponse.json(todos);
}  
 
const postSchema = yup.object({  
    description: yup.string().required(), 
    complete: yup.boolean().optional().default(false), 
})
 
export async function POST(request: Request) {   
     
    try { 
        const body = await postSchema.validate(await request.json()); 
        const todo = await prisma.todo.create({ data: body });  
         
        return NextResponse.json(todo, { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}