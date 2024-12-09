import {useState, useEffect} from 'react';

export default function useClock() {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const clock = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(clock);
    }, []);

    return currentTime;
}