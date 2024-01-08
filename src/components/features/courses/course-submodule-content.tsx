import Link from 'next/link';

type Props = {
    type: string;
    url: string;
};

const CourseSubmoduleContent = ({ type, url }: Props) => {
    if (type === 'video') {
        const youtubeEmbedUrl = url.replace('watch?v=', 'embed/');
        return (
            <iframe
                src={youtubeEmbedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-course-content"
            ></iframe>
        );
    }

    if (type === 'pdf') {
        const pdfUrl = url.split('/').slice(0, -1).join('/') + '/preview';
        return (
            <iframe src={pdfUrl} className="w-full h-course-content"></iframe>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <h6>Eksternal Link Resources</h6>
            <Link href={url as any} target="_blank" className="text-primary">
                {url}
            </Link>
        </div>
    );
};

export default CourseSubmoduleContent;
