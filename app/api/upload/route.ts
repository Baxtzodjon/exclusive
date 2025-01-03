// app/api/banner and product/upload/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/uploads");

async function ensureUploadDirExists() {
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }
}

export async function POST(req: Request) {
    try {
        await ensureUploadDirExists();

        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json(
                { success: false, message: "No file uploaded" },
                { status: 400 }
            );
        }

        const fileName = file.name;
        let filePath = path.join(uploadDir, fileName); // Сохраняем файл в папку public/uploads

        const buffer = await file.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(buffer));

        // Возвращаем относительный путь, начиная с /uploads/
        // const relativePath = `/uploads/${fileName}`;
        const relativePath = `${fileName}`;

        return NextResponse.json({
            success: true,
            message: "Image uploaded successfully",
            data: relativePath, // Отправляем относительный путь
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

// Основной обработчик POST запроса для загрузки файлов
// export async function POST(req: Request) {
//     try {
//         // Убедимся, что директория для загрузки существует
//         await ensureUploadDirExists();

//         const formData = await req.formData();
//         const file = formData.get("image") as File; // Получаем файл из формы

//         if (!file) {
//             return NextResponse.json(
//                 { success: false, message: "No file uploaded" },
//                 { status: 400 }
//             );
//         }

//         // Генерация уникального имени для файла с использованием временной метки
//         const fileExtension = path.extname(file.name); // Получаем расширение файла
//         const timestamp = Date.now(); // Получаем текущую временную метку (в миллисекундах)
//         const fileName = `${timestamp}${fileExtension}`; // Генерируем уникальное имя файла

//         // Путь для сохранения файла
//         const filePath = path.join(uploadDir, fileName);

//         // Чтение данных из файла
//         const buffer = await file.arrayBuffer();
//         await fs.writeFile(filePath, Buffer.from(buffer));

//         // Относительный путь, который будет возвращен
//         const relativePath = `/uploads/${fileName}`;

//         return NextResponse.json({
//             success: true,
//             message: "Image uploaded successfully",
//             data: relativePath, // Возвращаем относительный путь
//         });
//     } catch (error: any) {
//         return NextResponse.json(
//             { success: false, message: error.message },
//             { status: 500 }
//         );
//     }
// }