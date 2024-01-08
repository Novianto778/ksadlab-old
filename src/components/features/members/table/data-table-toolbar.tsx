'use client';

import { X } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Search..."
                    value={
                        // (table.getColumn('name')?.getFilterValue() as string) ??
                        // ''
                        table.getState().globalFilter ?? ''
                    }
                    onChange={(event) =>
                        // table
                        //     .getColumn('name')
                        //     ?.setFilterValue(event.target.value)
                        table.setGlobalFilter(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn('level') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('level')}
                        title="Level"
                        options={[
                            {
                                label: '1',
                                value: 1,
                            },
                            {
                                label: '2',
                                value: 2,
                            },
                            {
                                label: '3',
                                value: 3,
                            },
                            {
                                label: '4',
                                value: 4,
                            },
                        ]}
                    />
                )}
                {table.getColumn('angkatan') && (
                    <DataTableFacetedFilter
                        column={table.getColumn('angkatan')}
                        title="Angkatan"
                        options={[
                            {
                                label: '2022',
                                value: 2022,
                            },
                            {
                                label: '2023',
                                value: 2023,
                            },
                        ]}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    );
}
