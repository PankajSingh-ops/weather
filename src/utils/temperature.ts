import type { TemperatureUnit } from '@/types/weather';

export const getTemp = (
    celsius: number,
    fahrenheit: number,
    unit: TemperatureUnit
): number => (unit === 'C' ? Math.round(celsius) : Math.round(fahrenheit));

export const getTempString = (
    celsius: number,
    fahrenheit: number,
    unit: TemperatureUnit
): string => `${getTemp(celsius, fahrenheit, unit)}°`;
