import { useRef, useEffect } from 'react';
import type { HourlyForecastProps } from '@/types/weather';
import { formatHour, isCurrentHour } from '@/utils/formatDate';
import { getTempString } from '@/utils/temperature';
import styles from './HourlyForecast.module.css';

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hours, unit }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Scroll to current hour on mount
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        const activeEl = container.querySelector(`.${styles.active}`) as HTMLElement | null;
        if (activeEl) {
            activeEl.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
        }
    }, [hours]);

    // Mouse wheel horizontal scroll
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };
        container.addEventListener('wheel', onWheel, { passive: false });
        return () => container.removeEventListener('wheel', onWheel);
    }, []);

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Today's Forecast</h3>
            <div className={styles.strip} ref={scrollRef}>
                {hours.map((hour) => {
                    const isCurrent = isCurrentHour(hour.time);
                    return (
                        <div
                            key={hour.time_epoch}
                            className={`${styles.item} ${isCurrent ? styles.active : ''}`}
                        >
                            <span className={styles.time}>{isCurrent ? 'Now' : formatHour(hour.time)}</span>
                            <img
                                src={`https:${hour.condition.icon}`}
                                alt={hour.condition.text}
                                className={styles.icon}
                                width={40}
                                height={40}
                                loading="lazy"
                            />
                            <span className={styles.temp}>
                                {getTempString(hour.temp_c, hour.temp_f, unit)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HourlyForecast;
