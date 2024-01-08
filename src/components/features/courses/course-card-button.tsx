import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { Lock } from 'lucide-react';

type Props = {
    isAllowed?: boolean;
    isUserProgressExist?: boolean;
    className?: string;
    onNavigate?: () => void;
    onLearn?: () => void;
};

const CourseCardButton = ({
    isAllowed,
    isUserProgressExist,
    className,
    onNavigate,
    onLearn,
}: Props) => {
    let button;
    const buttonClass = cn('rounded-full mt-4 w-full flex gap-2', className);

    if (isAllowed) {
        if (isUserProgressExist) {
            button = (
                <Button
                    onClick={onNavigate}
                    className={buttonClass}
                    variant="primary"
                >
                    Continue
                </Button>
            );
        } else {
            button = (
                <Button
                    onClick={() => {
                        onLearn?.();
                        onNavigate?.();
                    }}
                    className={buttonClass}
                    variant="primary"
                >
                    Start
                </Button>
            );
        }
    } else {
        button = (
            <Button className={buttonClass} variant="primary" disabled>
                <Lock size={16} />
                Locked
            </Button>
        );
    }

    return button;
};

export default CourseCardButton;
