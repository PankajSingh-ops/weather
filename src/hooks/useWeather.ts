import { useState, useEffect, useCallback } from 'react';
import { fetchForecast } from '@/api/weather';
import type { WeatherState } from '@/types/weather';

export const useWeather = (city: string): WeatherState & { refetch: () => void } => {
    const [state, setState] = useState<WeatherState>({
        data: null,
        loading: true,
        error: null,
    });

    const load = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const data = await fetchForecast(city);
            setState({ data, loading: false, error: null });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setState({ data: null, loading: false, error: message });
        }
    }, [city]);

    useEffect(() => {
        load();
    }, [load]);

    return { ...state, refetch: load };
};
