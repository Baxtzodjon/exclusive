// app/api/clerk-stats/route.ts
import { NextResponse } from 'next/server';

const CLERK_API_URL = 'https://api.clerk.dev/v1';
const CLERK_API_KEY = process.env.CLERK_SECRET_KEY;

export async function GET() {
    console.log("CLERK_API_KEY:", CLERK_API_KEY);

    try {
        const response = await fetch(`${CLERK_API_URL}/users`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${CLERK_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Ошибка при запросе данных: ${response.statusText}`);
        }

        const users = await response.json();

        const activeUsers = users.filter((user: any) => user.is_active).length;
        const totalUsers = users.length;

        return NextResponse.json({
            activeUsers,
            totalUsers,
        });
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return NextResponse.json({ error: 'Не удалось получить данные' }, { status: 500 });
    }
}