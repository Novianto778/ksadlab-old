import { Member } from '@/lib/db/schema';
import { User } from '@clerk/nextjs/server';

export type UserMember = User & Member;
