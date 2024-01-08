import { db } from '@/lib/db';
import { course } from '@/lib/db/schema';
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
    // const modules = await db
    //     .select()
    //     .from(course)
    //     .innerJoin(courseType, eq(course.courseTypeId, courseType.courseTypeId))
    //     .leftJoin(courseModule, eq(courseModule.courseId, course.courseId))
    //     .leftJoin(submodule, eq(submodule.moduleId, courseModule.moduleId))
    //     .where(eq(course.courseId, params.id));

    // console.log(modules);

    const modules = await db.query.course.findMany({
        with: {
            courseModule: {
                orderBy: (courseModule, { asc }) => asc(courseModule.order),
                with: {
                    submodules: {
                        orderBy: (submodule, { asc }) => asc(submodule.order),
                    },
                },
            },
        },
        where: eq(course.courseId, params.id),
    });

    return NextResponse.json(modules[0], {
        status: 200,
    });
}
