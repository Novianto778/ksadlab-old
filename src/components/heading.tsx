import React from 'react';
import { cn } from '../utils/cn';

type Props = {
    heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
} & React.ComponentProps<'h1'> &
    React.ComponentProps<'h2'> &
    React.ComponentProps<'h3'> &
    React.ComponentProps<'h4'> &
    React.ComponentProps<'h5'> &
    React.ComponentProps<'h6'>;

const Heading = ({ heading, className, ...props }: Props) => {
    let Comp = heading;

    return <Comp className={cn('font-bold text-2xl', className)} {...props} />;
};

export default Heading;
