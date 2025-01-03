import clientPromise from "@/lib/mongdb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (res: NextResponse, req: NextRequest) => {
    try {
        const client = await clientPromise;

        const db = client.db("mydatabase");

        const product = await db.collection("product").find().toArray();

        return NextResponse.json({ 
            success: true, 
            data: product, 
            message: "got product",
        });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const client = await clientPromise;

        const db = client.db("mydatabase");
        const body = await req.json();
        const result = await db.collection("product").insertOne(body);

        return NextResponse.json({ 
            success: true, 
            data: result, 
            message: "New product was created!", 
        });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message });
    }
};