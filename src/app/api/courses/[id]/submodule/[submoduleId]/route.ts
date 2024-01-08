import { db } from '@/lib/db';
import {
    NewMemberProgress,
    courseModule,
    memberProgress,
    submodule,
} from '@/lib/db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    {
        params,
    }: {
        params: {
            submoduleId: number;
        };
    }
) {
    const submoduleById = await db
        .select()
        .from(submodule)
        .where(eq(submodule.submoduleId, params.submoduleId));

    return NextResponse.json(submoduleById[0], {
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
            submoduleId: number;
        };
    }
) {
    const { submoduleId } = params;
    const body = await req.json();

    const submoduleById = await db
        .select()
        .from(submodule)
        .where(eq(submodule.submoduleId, submoduleId));

    // update memberProgress

    const newMemberProgress: NewMemberProgress = {
        submoduleId: submoduleId,
        completed: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        memberCourseId: body.memberCourseId,
    };

    await db
        .insert(memberProgress)
        .values(newMemberProgress)
        .onDuplicateKeyUpdate({
            set: {
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

    const nextSubmodule = await db
        .select()
        .from(submodule)
        .where(
            and(
                eq(submodule.order, submoduleById[0].order + 1),
                eq(submodule.moduleId, submoduleById[0].moduleId)
            )
        );

    if (nextSubmodule.length > 0) {
        return NextResponse.json(nextSubmodule[0], {
            status: 200,
        });
    }

    // SELECT * FROM ksadlab.submodule
    // WHERE module_id = (
    // 	select module_id from module where course_id = 1 and module.order = 2
    // )
    const nextModule = (await db.execute(sql`
                select * from submodule
                where module_id = (
                    select module_id from ${courseModule} where course_id = ${params.id} and module.order = (
        select ${courseModule.order} + 1 from ${submodule} join ${courseModule} using (module_id)  where submodule_id = ${submoduleById[0].submoduleId}
        )
    )
    `)) as any;

    if (nextModule.length > 0) {
        return NextResponse.json(nextModule[0][0], {
            status: 200,
        });
    }

    return NextResponse.json(submoduleById[0], {
        status: 200,
    });
}
