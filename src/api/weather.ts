import type {
    ForecastResponse,
    SearchResult,
} from '@/types/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API;
const BASE = 'https://api.weatherapi.com/v1';
const MAX_RETRIES = 3;
const FETCH_TIMEOUT = 15000; // 15 seconds

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

            const res = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            // Retry on 5xx server errors (like 504 Gateway Timeout)
            if (res.status >= 500 && attempt < retries - 1) {
                await new Promise(r => setTimeout(r, 1000 * (attempt + 1))); // 1s, 2s backoff
                continue;
            }

            return res;
        } catch (err) {
            if (attempt < retries - 1) {
                await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
                continue;
            }
            throw err;
        }
    }
    throw new Error('Network error');
}

const CACHE_KEY = 'weatherapp_cache';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

interface CacheEntry {
    data: ForecastResponse;
    timestamp: number;
    city: string;
}

function getCached(city: string): ForecastResponse | null {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const entry: CacheEntry = JSON.parse(raw);
        if (entry.city.toLowerCase() === city.toLowerCase() && Date.now() - entry.timestamp < CACHE_TTL) {
            return entry.data;
        }
    } catch {
        // ignore
    }
    return null;
}

function setCache(city: string, data: ForecastResponse): void {
    try {
        const entry: CacheEntry = { data, timestamp: Date.now(), city };
        localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
    } catch {
        // ignore quota errors
    }
}

export const fetchForecast = async (
    city: string,
    days: number = 7
): Promise<ForecastResponse> => {
    const cached = getCached(city);
    if (cached) return cached;

    const res = await fetchWithRetry(
        `${BASE}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=${days}&aqi=yes&alerts=yes`
    );
    if (!res.ok) {
        if (res.status === 400) throw new Error('City not found');
        throw new Error('Network error');
    }
    const data = (await res.json()) as ForecastResponse;
    setCache(city, data);
    return data;
};

export const searchCities = async (query: string): Promise<SearchResult[]> => {
    if (query.length < 2) return [];
    const res = await fetchWithRetry(
        `${BASE}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`,
        2 // fewer retries for search
    );
    if (!res.ok) return [];
    return (await res.json()) as SearchResult[];
};
