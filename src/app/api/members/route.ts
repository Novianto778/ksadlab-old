import { AddMemberForm } from '@/components/features/members/add-member-dialog';
import { db } from '@/lib/db';
import { member } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
    const members = await db.select().from(member);

    return NextResponse.json(members, {
        status: 200,
    });
}

export async function POST(req: Request) {
    const url = 'https://api.clerk.com/v1/users';
    const token = process.env.CLERK_SECRET_KEY;

    const body = (await req.json()) as AddMemberForm;

    const inputData = {
        email_address: [body.email],
        username: `M-${body.username}`,
        password: body.password,
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
            name: body.name,
            username: body.username,
            angkatan: body.angkatan,
            level: body.level,
            point: body.point,
        });

        return NextResponse.json(body, {
            status: 201,
        });
    } catch (error: any) {
        console.log('error', typeof error.message);

        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
