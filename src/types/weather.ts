// Location
export interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

// Condition
export interface Condition {
    text: string;
    icon: string;
    code: number;
}

// Air Quality
export interface AirQuality {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    'us-epa-index': number;
    'gb-defra-index': number;
}

// Current Weather
export interface Current {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    air_quality?: AirQuality;
}

// Hourly
export interface Hour {
    time_epoch: number;
    time: string;
    temp_c: number;
    temp_f: number;
    condition: Condition;
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    chance_of_rain: number;
    chance_of_snow: number;
    is_day: number;
}

// Daily Forecast
export interface ForecastDay {
    date: string;
    date_epoch: number;
    day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        condition: Condition;
        uv: number;
        daily_chance_of_rain: number;
        daily_chance_of_snow: number;
    };
    astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
    };
    hour: Hour[];
}

// Alert
export interface Alert {
    headline: string;
    msgtype: string;
    severity: string;
    urgency: string;
    areas: string;
    category: string;
    certainty: string;
    event: string;
    note: string;
    effective: string;
    expires: string;
    desc: string;
    instruction: string;
}

// Full API Responses
export interface CurrentWeatherResponse {
    location: Location;
    current: Current;
}

export interface ForecastResponse {
    location: Location;
    current: Current;
    forecast: {
        forecastday: ForecastDay[];
    };
    alerts?: {
        alert: Alert[];
    };
}

export interface SearchResult {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}

// App State
export type TemperatureUnit = 'C' | 'F';

export interface WeatherState {
    data: ForecastResponse | null;
    loading: boolean;
    error: string | null;
}

// Component Props
export interface WeatherCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    subValue?: string;
}

export interface CurrentWeatherProps {
    data: ForecastResponse;
    unit: TemperatureUnit;
}

export interface HourlyForecastProps {
    hours: Hour[];
    unit: TemperatureUnit;
}

export interface WeeklyForecastProps {
    forecastDays: ForecastDay[];
    unit: TemperatureUnit;
}

export interface WeatherDetailsProps {
    current: Current;
    astro: ForecastDay['astro'];
}

export interface SearchBarProps {
    onCitySelect: (city: string) => void;
    onLocationRequest: () => void;
}

export interface UnitToggleProps {
    unit: TemperatureUnit;
    onToggle: (unit: TemperatureUnit) => void;
}

export interface SkeletonProps {
    variant: 'current' | 'hourly' | 'weekly' | 'details' | 'card';
    count?: number;
}
