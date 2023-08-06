import { db } from '@/lib/db';
import { course } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
    const courses = await db.select().from(course);

    return NextResponse.json(courses, {
        status: 200,
    });
}
