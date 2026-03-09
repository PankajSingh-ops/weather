export type WeatherTheme = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'night' | 'foggy';

export const getWeatherTheme = (conditionCode: number, isDay: number): WeatherTheme => {
    if (!isDay) return 'night';
    if ([1000].includes(conditionCode)) return 'sunny';
    if ([1003, 1006, 1009].includes(conditionCode)) return 'cloudy';
    if ([1030, 1135, 1147].includes(conditionCode)) return 'foggy';
    if (conditionCode >= 1273) return 'stormy';
    if (conditionCode >= 1210) return 'snowy';
    if (conditionCode >= 1150) return 'rainy';
    return 'sunny';
};
