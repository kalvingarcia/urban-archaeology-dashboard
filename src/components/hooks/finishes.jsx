import {useCallback, useEffect, useState} from 'react';

export default function useFinishes() {
    const [finishes, setFinishes] = useState([]);

    const updateFinishes = useCallback(async () => {
        setFinishes(await window.api.GET_ALL_FINISHES());
    }, []);
    useEffect(() => {
        updateFinishes();
    }, []);

    return {finishes, updateFinishes};
}