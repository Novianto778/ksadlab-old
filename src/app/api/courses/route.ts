import { db } from '@/lib/db';
import { course, courseType } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
    const courses = await db
        .select()
        .from(course)
        .innerJoin(
            courseType,
            eq(course.courseTypeId, courseType.courseTypeId)
        );

    return NextResponse.json(courses, {
        status: 200,
    });
}
