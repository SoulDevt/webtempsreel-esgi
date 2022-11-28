import { useMemo, useEffect, useState } from 'react';
import { serverUrl } from '../enums';

const Test = () => {
    const [data, setData] = useState(0);
    const source = new EventSource(`${serverUrl}/sse/test`);

    useEffect(() => {
        source.addEventListener('open', () => {
            console.log('SSE opened!');
        });
        source.addEventListener('test', (e) => {
            const data = JSON.parse(e.data);
            setData(data.counter);
        });
        return () => {
            console.log('test')
            source.removeEventListener('test', () => {});
            source.removeEventListener('open', () => {});
            source.close();
        };
    }, [source]);

    return (
        <div className="Test container mx-auto px-4 flex flex-col justify-center items-center">
            <h1>Test sse</h1>
            <p>{data}</p>
        </div>
    );
};

export default Test;
