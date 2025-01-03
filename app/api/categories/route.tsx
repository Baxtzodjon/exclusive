import clientPromise from "@/lib/mongdb";
import { ObjectId } from "mongodb";

export async function POST(req: any) {
    const client = await clientPromise;
    const db = client.db("mydatabase");

    const data = await req.json();
    await db.collection("categories").insertOne(data);

    return new Response(JSON.stringify({ message: "successfully" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
}

export async function GET() {
    const client = await clientPromise;
    const db = client.db("mydatabase");

    const results = await db.collection("categories").find({}).toArray();

    return new Response(JSON.stringify(results), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function PATCH(req: any) {
    const client = await clientPromise;
    const db = client.db("mydatabase");

    try {
        const { _id, ...updateData } = await req.json();

        if (!_id || !ObjectId.isValid(_id)) {
            return new Response(JSON.stringify({ message: "Invalid ID" }), { status: 400 });
        }

        const result = await db.collection("categories").updateOne(
            { _id: new ObjectId(_id) },
            { $set: updateData }
        );

        if (result.modifiedCount === 0) {
            return new Response(JSON.stringify({ message: "No changes made" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Category updated successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: "Update failed", error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}