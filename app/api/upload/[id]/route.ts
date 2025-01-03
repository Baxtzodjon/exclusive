import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongdb";

const uploadDir = path.join(process.cwd(), "public/uploads");

async function ensureUploadDirExists() {
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }
}

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

        // Сохраняем файл на сервере
        const fileName = file.name;
        const filePath = path.join(uploadDir, fileName);

        const buffer = await file.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(buffer));

        // Теперь обновляем путь в базе данных
        const client = await clientPromise;
        const db = client.db("mydatabase");

        // Обновление записи в базе данных с новым путем к изображению
        const updatedBanner = await db.collection("banner").findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { image: `/uploads/${fileName}` } }, // обновляем путь к изображению
            { returnDocument: 'after' } // Возвращаем обновленный документ
        );

        // Проверяем, что баннер был обновлен
        if (!updatedBanner || !updatedBanner.value) {
            return NextResponse.json(
                { success: false, message: "Banner not found or not updated" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Banner updated successfully',
            data: updatedBanner.value.image,  // Отправляем новый путь к изображению
        });
    } catch (error: any) {
        console.error('Error updating banner:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}