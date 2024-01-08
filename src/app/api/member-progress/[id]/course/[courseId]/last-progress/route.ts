import { db } from '@/lib/db';
import {
    courseModule,
    memberCourse,
    memberProgress,
    submodule,
} from '@/lib/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { id: number; courseId: number } }
) {
    const { id } = params;

    // need submoduleId from table submodule

    const memberLastProgress = await db
        .select()
        .from(memberProgress)
        .innerJoin(
            memberCourse,
            eq(memberProgress.memberCourseId, memberCourse.memberCourseId)
        )
        .where(
            and(
                eq(memberCourse.memberId, id),
                eq(memberCourse.courseId, params.courseId)
            )
        )
        .orderBy(desc(memberProgress.updatedAt))
        .limit(1);

    const firstSubmodule = await db
        .select()
        .from(submodule)
        .innerJoin(courseModule, eq(submodule.moduleId, courseModule.moduleId))
        .where(eq(courseModule.courseId, params.courseId))
        .orderBy(submodule.order)
        .limit(1);

    let submoduleId;
    if (memberLastProgress.length > 0) {
        submoduleId = memberLastProgress[0]?.member_progress?.submoduleId;
    } else {
        submoduleId = firstSubmodule[0]?.submodule.submoduleId;
    }

    if (!submoduleId) {
        return NextResponse.json(null, {
            status: 200,
        });
    }

    return NextResponse.json(submoduleId, {
        status: 200,
    });
}
