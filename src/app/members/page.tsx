'use client';
import React from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import useMembers from '@/hooks/useMembers';
import { DataTable } from '../../components/features/members/table/data-table';
import { memberColumns } from '../../components/features/members/columns';
import AddMemberDialog from '../../components/features/members/AddMemberDialog';

type Props = {};

// const createStudent = () => {
//     const res = fetch('http://localhost:3000/api/members', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     console.log(res);
// };

const MembersPage = (props: Props) => {
    const { members, isLoading } = useMembers();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex items-center justify-between w-full">
                <Heading heading="h1">Members</Heading>
                <AddMemberDialog>
                    <Button className="rounded" variant="primary">
                        Add Student
                    </Button>
                </AddMemberDialog>
            </div>
            <div className="mt-8">
                <DataTable columns={memberColumns} data={members || []} />
            </div>
        </>
    );
};

export default MembersPage;
