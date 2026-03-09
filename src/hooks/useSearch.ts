import { useState, useEffect } from 'react';
import { searchCities } from '@/api/weather';
import type { SearchResult } from '@/types/weather';

export const useSearch = (query: string, delay: number = 300) => {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setSearching(true);
        const timer = setTimeout(async () => {
            try {
                const data = await searchCities(query);
                setResults(data);
            } catch {
                setResults([]);
            } finally {
                setSearching(false);
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [query, delay]);

    return { results, searching };
};
