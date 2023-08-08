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
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { MAX_LEVEL } from '@/config/constant/course';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '../../ui/form';
import { useState } from 'react';
import useMembers from '@/hooks/useMembers';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const addMember = async (data: z.infer<typeof AddMemberSchema>) => {
    const res = await axios.post('/api/members', data);
    return res.data;
};
const AddMemberSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
    email: z.string().email(),
    username: z.string().min(3, {
        message: 'Username must be at least 3 characters',
    }),
    password: z.string().min(3, {
        message: 'Password must be at least 3 characters',
    }),
    angkatan: z.coerce.number(),
    level: z.number().min(1).max(MAX_LEVEL),
    point: z.number().min(0),
});

export type AddMemberForm = z.infer<typeof AddMemberSchema>;

type Props = {
    children: React.ReactNode;
};

const AddMemberDialog = ({ children }: Props) => {
    const { mutate } = useMembers();
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof AddMemberSchema>>({
        resolver: zodResolver(AddMemberSchema),
        defaultValues: {
            name: '',
            email: '',
            username: '',
            password: '',
            angkatan: new Date().getFullYear(),
            level: 1,
            point: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof AddMemberSchema>) {
        try {
            const promise = addMember(values);

            toast.promise(promise, {
                loading: 'Loading...',
                success: 'Member created',
                error: 'Failed to create member',
            });

            await promise;
            mutate();
            setIsOpen(false);
            form.reset();
        } catch (e: any) {
            console.log('error', e);
            toast.error(e.response.data.message);
        }
        // const promise = await addMember(values);
        // // toast.promise(promise, {
        // //     loading: 'Loading...',
        // //     success: 'Member created',
        // //     error: 'Failed to create member',
        // // });
        // // const res = await promise;
        // console.log('res', promise);

        // mutate();
        // setIsOpen(false);
        // form.reset();
    }
    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                {children}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onClose={() => setIsOpen(false)}
            >
                <DialogHeader>
                    <DialogTitle>Create A New Member</DialogTitle>
                    <DialogDescription>
                        Enter the details of the new member.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid gap-4 py-4"
                    >
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormControl>
                                            <Input
                                                placeholder="john doe"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormControl>
                                            <Input
                                                placeholder="johndoe@gmail.com"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormControl>
                                            <Input
                                                placeholder="201710963"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="angkatan" className="text-right">
                                Angkatan
                            </Label>
                            <FormField
                                control={form.control}
                                name="angkatan"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="level" className="text-right">
                                Level
                            </Label>
                            <FormField
                                control={form.control}
                                name="level"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormControl>
                                            <Select
                                                defaultValue="1"
                                                onValueChange={(value) => {
                                                    field.onChange(+value);
                                                }}
                                            >
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Select the level" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Level
                                                        </SelectLabel>
                                                        {new Array(MAX_LEVEL)
                                                            .fill(0)
                                                            .map((_, index) => (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={`${
                                                                        index +
                                                                        1
                                                                    }`}
                                                                >
                                                                    {index + 1}
                                                                </SelectItem>
                                                            ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="point" className="text-right">
                                Point
                            </Label>
                            <FormField
                                control={form.control}
                                name="point"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddMemberDialog;
