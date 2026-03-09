import React from 'react';
import type { WeeklyForecastProps } from '@/types/weather';
import { getDayName, isToday } from '@/utils/formatDate';
import { getTempString } from '@/utils/temperature';
import styles from './WeeklyForecast.module.css';

const WeeklyForecast: React.FC<WeeklyForecastProps> = React.memo(({ forecastDays, unit }) => {
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>7-Day Forecast</h3>
            <div className={styles.grid}>
                {forecastDays.map((day) => {
                    const today = isToday(day.date);
                    return (
                        <div
                            key={day.date_epoch}
                            className={`${styles.card} ${today ? styles.today : ''}`}
                        >
                            <span className={styles.day}>{today ? 'Today' : getDayName(day.date, true)}</span>
                            <img
                                src={`https:${day.day.condition.icon}`}
                                alt={day.day.condition.text}
                                className={styles.icon}
                                width={44}
                                height={44}
                                loading="lazy"
                            />
                            <div className={styles.temps}>
                                <span className={styles.high}>
                                    {getTempString(day.day.maxtemp_c, day.day.maxtemp_f, unit)}
                                </span>
                                <span className={styles.low}>
                                    {getTempString(day.day.mintemp_c, day.day.mintemp_f, unit)}
                                </span>
                            </div>
                            {day.day.daily_chance_of_rain > 0 && (
                                <span className={styles.rain}>
                                    💧 {day.day.daily_chance_of_rain}%
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

WeeklyForecast.displayName = 'WeeklyForecast';

export default WeeklyForecast;
