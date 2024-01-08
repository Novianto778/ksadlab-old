import { db } from '@/lib/db';
import { NewMemberCourse, memberCourse } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { id: number; courseId: number } }
) {
    const { id } = params;

    const memberCourseProgressById = await db.query.memberCourse.findMany({
        with: {
            memberProgress: true,
        },
        where: and(
            eq(memberCourse.memberId, id),
            eq(memberCourse.courseId, params.courseId)
        ),
    });

    if (memberCourseProgressById.length === 0) {
        return NextResponse.json(null, {
            status: 200,
        });
    }

    return NextResponse.json(memberCourseProgressById[0], {
        status: 200,
    });
}

export async function POST(
    req: Request,
    {
        params,
    }: {
        params: {
            id: number;
            courseId: number;
        };
    }
) {
    const body = await req.json();

    const newMemberCourse: NewMemberCourse = {
        courseId: params.courseId,
        memberId: body.memberId,
        progress: 0,
        status: 'ongoing',
    };

    const res = await db.insert(memberCourse).values(newMemberCourse);

    console.log(res);

    return NextResponse.json(res, {
        status: 200,
    });
}
