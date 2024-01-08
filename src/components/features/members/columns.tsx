'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Member } from '@/lib/db/schema';
import { Checkbox } from '../../ui/checkbox';
import { DataTableColumnHeader } from './table/data-table-column-header';
import { ro } from 'date-fns/locale';
import { DataTableRowActions } from './table/data-table-row-actions';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const memberColumns: ColumnDef<Member>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <>
                <Checkbox
                    checked={table.getIsAllPageRowsSelected()}
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                    className="translate-y-[2px]"
                />
            </>
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'username',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Username" />;
        },
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Name" />;
        },
    },
    {
        accessorKey: 'level',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Level" />;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'angkatan',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Angkatan" />;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'point',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Point" />;
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
