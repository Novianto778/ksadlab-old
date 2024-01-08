import { db } from '@/lib/db';
import { course, courseType } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: {
            id: number;
        };
    }
) {
    const courses = await db
        .select()
        .from(course)
        .innerJoin(courseType, eq(course.courseTypeId, courseType.courseTypeId))
        .where(eq(course.courseId, params.id));

    return NextResponse.json(courses[0], {
        status: 200,
    });
}
