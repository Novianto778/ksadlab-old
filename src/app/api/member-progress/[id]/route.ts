import { db } from '@/lib/db';
import { member } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { id: number } }
) {
    const { id } = params;

    // const memberProgressById = await db.execute(
    //     sql`SELECT * FROM member
    // JOIN member_course using(member_id)
    // left join member_progress using (member_course_id)
    // where member_id = ${id}
    // `
    // );
    // const memberProgressById = await db
    //     .select()
    //     .from(member)
    //     .innerJoin(memberCourse, eq(member.memberId, memberCourse.memberId))
    //     .leftJoin(
    //         memberProgress,
    //         eq(memberProgress.memberCourseId, memberCourse.memberCourseId)
    //     )
    //     .where(eq(member.memberId, id));

    const memberProgressById = await db.query.member.findMany({
        with: {
            memberCourse: {
                with: {
                    memberProgress: true,
                },
            },
        },
        where: eq(member.memberId, id),
    });

    return NextResponse.json(memberProgressById[0], {
        status: 200,
    });
}
