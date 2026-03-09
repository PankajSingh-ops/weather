import React from 'react';
import type { WeatherDetailsProps } from '@/types/weather';
import WeatherCard from '@/components/WeatherCard/WeatherCard';
import styles from './WeatherDetails.module.css';

const WeatherDetails: React.FC<WeatherDetailsProps> = React.memo(({ current, astro }) => {
    const uvLevel = current.uv <= 2 ? 'Low' : current.uv <= 5 ? 'Moderate' : current.uv <= 7 ? 'High' : current.uv <= 10 ? 'Very High' : 'Extreme';
    const uvPercent = Math.min((current.uv / 11) * 100, 100);

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Weather Details</h3>
            <div className={styles.grid}>
                {/* Humidity */}
                <WeatherCard
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                        </svg>
                    }
                    label="Humidity"
                    value={`${current.humidity}%`}
                />

                {/* Wind */}
                <WeatherCard
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                        </svg>
                    }
                    label="Wind"
                    value={`${Math.round(current.wind_kph)} km/h`}
                    subValue={current.wind_dir}
                />

                {/* UV Index */}
                <div className={styles.uvCard}>
                    <WeatherCard
                        icon={
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        }
                        label="UV Index"
                        value={`${current.uv}`}
                        subValue={uvLevel}
                    />
                    <div className={styles.uvBar}>
                        <div
                            className={styles.uvFill}
                            style={{ width: `${uvPercent}%` }}
                        />
                    </div>
                </div>

                {/* Visibility */}
                <WeatherCard
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    }
                    label="Visibility"
                    value={`${current.vis_km} km`}
                />

                {/* Pressure */}
                <WeatherCard
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="20" x2="12" y2="10" />
                            <line x1="18" y1="20" x2="18" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="16" />
                        </svg>
                    }
                    label="Pressure"
                    value={`${current.pressure_mb} mb`}
                />

                {/* Sunrise & Sunset */}
                <WeatherCard
                    icon={
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 18a5 5 0 0 0-10 0" />
                            <line x1="12" y1="9" x2="12" y2="2" />
                            <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                            <line x1="1" y1="18" x2="3" y2="18" />
                            <line x1="21" y1="18" x2="23" y2="18" />
                            <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                            <line x1="23" y1="22" x2="1" y2="22" />
                            <polyline points="8,6 12,2 16,6" />
                        </svg>
                    }
                    label="Sunrise & Sunset"
                    value={astro.sunrise}
                    subValue={`Sunset: ${astro.sunset}`}
                />
            </div>
        </div>
    );
});

WeatherDetails.displayName = 'WeatherDetails';

export default WeatherDetails;
