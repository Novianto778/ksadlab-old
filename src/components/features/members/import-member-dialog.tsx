'use client';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
    children: React.ReactNode;
};

const ImportMemberDialog = ({ children }: Props) => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const importExcel = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                setIsLoading(true);
                const res = await axios.post('/api/members/import', formData);
                if (res.data.success) {
                    toast.success('Imported successfully');
                }
            } catch (error: any) {
                console.log(error);

                toast.error(error.response.data.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Import Member</DialogTitle>
                    <DialogDescription>
                        Import member from CSV file.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center">
                    <Input
                        type="file"
                        onChange={(e) => {
                            if (e.target.files) {
                                setFile(e.target.files[0]);
                            }
                        }}
                        accept=".csv,.xlsx,.xls"
                        className="cursor-pointer"
                    />
                </div>
                <DialogFooter>
                    <Button isLoading={isLoading} onClick={importExcel}>
                        Import
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ImportMemberDialog;
