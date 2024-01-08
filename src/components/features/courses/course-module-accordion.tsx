'use client';
import useCourseModules from '@/hooks/useCourseModules';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import CourseSubmoduleItem from '@/features/courses/course-submodule-item';

type Props = {
    params: {
        id: string;
        submoduleId: string;
    };
};

const CourseModuleAccordion = ({ params }: Props) => {
    const { courseModules } = useCourseModules(+params.id);

    const currentModule = courseModules?.courseModule.find((module) =>
        module.submodules.find(
            (submodule) => submodule.submoduleId === +params.submoduleId
        )
    );

    return (
        <Accordion type="multiple" defaultValue={[currentModule?.title || '']}>
            {courseModules?.courseModule.map((module) => {
                return (
                    <AccordionItem
                        value={module.title}
                        key={module.moduleId}
                        data-state="open"
                    >
                        <AccordionTrigger className="px-4">
                            {module.title}
                        </AccordionTrigger>
                        <AccordionContent>
                            {module.submodules.map((submodule) => {
                                return (
                                    <CourseSubmoduleItem
                                        key={`${submodule.moduleId}-${submodule.title}`}
                                        type={submodule.type}
                                        title={submodule.title}
                                        currentSubmoduleId={params.submoduleId}
                                        submodule={submodule}
                                        courseId={params.id}
                                    />
                                );
                            })}
                        </AccordionContent>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

export default CourseModuleAccordion;
