'use client';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AddMemberDialog from '@/components/features/members/add-member-dialog';
import ImportMemberDialog from '@/components/features/members/import-member-dialog';
import { memberColumns } from '@/features/members/columns';
import { DataTable } from '@/features/members/table/data-table';
import useMembers from '@/hooks/useMembers';

type Props = {};

const MembersPage = (props: Props) => {
    const { members, isLoading } = useMembers();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="flex items-center justify-between w-full">
                <Heading heading="h1">Members</Heading>
                <div className="flex gap-2 items-center">
                    <ImportMemberDialog>
                        <Button className="rounded">Import Member</Button>
                    </ImportMemberDialog>
                    <AddMemberDialog>
                        <Button className="rounded" variant="primary">
                            Add Member
                        </Button>
                    </AddMemberDialog>
                </div>
            </div>
            <div className="mt-8">
                <DataTable columns={memberColumns} data={members || []} />
            </div>
        </>
    );
};

export default MembersPage;
