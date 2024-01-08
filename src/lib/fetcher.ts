import axios from 'axios';

const fetcher = (url: string) =>
    axios
        .get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => res.data);

export default fetcher;
