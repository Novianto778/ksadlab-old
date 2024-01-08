import { db } from '@/lib/db';
import { member } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    const memberById = await db
        .select()
        .from(member)
        .where(eq(member.userId, id));

    return NextResponse.json(memberById[0], {
        status: 200,
    });
}
