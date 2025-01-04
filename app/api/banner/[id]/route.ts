import clientPromise from "@/lib/mongdb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

const uploadDir = path.join(process.cwd(), "public/uploads");

async function ensureUploadDirExists() {
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }
}

export const GET = async (
    req: NextRequest, { params }: { params: { id: string } }
) => {
    try {
        const client = await clientPromise;

        const db = client.db("mydatabase");

        const result = await db
            .collection("banner")
            .findOne({ _id: new ObjectId(params.id) });

        return NextResponse.json({
            success: true,
            data: result,
            message: "Data was getting!",
        });
    } catch (e: any) {
        return NextResponse.json({ suuccess: false, message: e.message });
    }
};

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }

        const fileName = file.name;
        const filePath = path.join(uploadDir, fileName);
        const buffer = await file.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(buffer));

        const client = await clientPromise;
        const db = client.db("mydatabase");
        
        const updatedBanner = await db.collection("banner").findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { image: fileName } },
            { returnDocument: 'after' }
        );

        if (!updatedBanner || !updatedBanner.value) {
            console.log(`Banner not found or not updated. ID: ${id}`);
            return NextResponse.json({
                success: true,
                message: "Banner updated successfully",
                data: updatedBanner?.value?.image ?? fileName,
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Banner updated successfully',
            data: updatedBanner.value.image,
        });

    } catch (error: any) {
        console.error('Error updating banner:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}

export const DELETE = async (
    req: NextRequest, { params }: { params: { id: string } }
) => {
    try {
        const client = await clientPromise;

        const db = client.db("mydatabase");

        const result = await db
            .collection("banner")
            .findOneAndDelete({ _id: new ObjectId(params.id) });

        return NextResponse.json({
            success: true,
            data: result,
            message: "Data was removed!",
        });
    } catch (e: any) {
        return NextResponse.json({ suuccess: false, message: e.message });
    }
};