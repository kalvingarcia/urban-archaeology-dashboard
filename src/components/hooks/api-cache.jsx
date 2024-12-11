import {useCallback, useEffect, useState} from 'react';

export function useProducts() {
    const [products, setProducts] = useState([]);

    const updateProducts = useCallback(async () => {
        setProducts(await window.api.GET_ALL_PRODUCTS());
    }, []);
    useEffect(() => {
        updateProducts();
    }, []);

    return {products, updateProducts};
}

export function useFinishes() {
    const [finishes, setFinishes] = useState([]);

    const updateFinishes = useCallback(async () => {
        setFinishes(await window.api.GET_ALL_FINISHES());
    }, []);
    useEffect(() => {
        updateFinishes();
    }, []);

    return {finishes, updateFinishes};
}

export function useTags() {
    const [tags, setTags] = useState([]);

    const updateTags = useCallback(async () => {
        setTags(await window.api.GET_ALL_TAGS());
    }, []);
    useEffect(() => {
        updateTags();
    }, []);

    return {tags, updateTags};
}