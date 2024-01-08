import { db } from '@/lib/db';
import { member } from '@/lib/db/schema';
import { NextResponse } from 'next/server';
import xlsx from 'xlsx';

export async function POST(req: Request) {
    const formData = await req.formData();

    const file = formData.get('file') as File;

    if (!file) {
        return NextResponse.json(
            {
                message: 'No file',
            },
            {
                status: 400,
            }
        );
    }

    const buffer = await file.arrayBuffer();
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    let workbook_sheet = workbook.SheetNames;
    let workbook_response = xlsx.utils.sheet_to_json(
        workbook.Sheets[workbook_sheet[0]]
    );

    type SheetData = {
        name: string;
        email: string;
        username: string;
        angkatan: number;
        level: number;
        point: number;
    };

    const url = 'https://api.clerk.com/v1/users';
    const token = process.env.CLERK_SECRET_KEY;

    for (let i = 0; i <= workbook_response.length; i++) {
        const curr = workbook_response[i] as SheetData;
        const inputData = {
            email_address: [curr?.email],
            username: `M-${curr?.username}`,
            password: '12345678',
            skip_password_checks: true,
            skip_password_requirement: true,
            created_at: new Date().toISOString(),
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(inputData),
            });
            const data = await response.json();

            if (!data.id) {
                throw new Error(data.errors[0].message);
            }

            await db.insert(member).values({
                userId: data.id,
                name: curr.name,
                username: curr.username,
                angkatan: curr.angkatan,
                level: curr.level,
                point: curr.point,
            });
        } catch (error: any) {
            return NextResponse.json(
                { message: error.message },
                { status: 500 }
            );
        }
    }

    return NextResponse.json({
        message: 'Success import member',
        success: true,
    });
}
