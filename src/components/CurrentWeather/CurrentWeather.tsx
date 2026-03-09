import type { CurrentWeatherProps } from '@/types/weather';
import { getTempString } from '@/utils/temperature';
import styles from './CurrentWeather.module.css';

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, unit }) => {
    const { current, location } = data;
    const temp = unit === 'C' ? Math.round(current.temp_c) : Math.round(current.temp_f);
    const feelsLike = getTempString(current.feelslike_c, current.feelslike_f, unit);

    const todayForecast = data.forecast.forecastday[0]?.day;
    const high = todayForecast
        ? getTempString(todayForecast.maxtemp_c, todayForecast.maxtemp_f, unit)
        : null;
    const low = todayForecast
        ? getTempString(todayForecast.mintemp_c, todayForecast.mintemp_f, unit)
        : null;

    return (
        <div className={styles.container}>
            <img
                className={styles.icon}
                src={`https:${current.condition.icon.replace('64x64', '128x128')}`}
                alt={current.condition.text}
                width={120}
                height={120}
                loading="lazy"
            />
            <div className={styles.tempWrapper}>
                <span className={styles.temp}>{temp}°</span>
            </div>
            <p className={styles.condition}>{current.condition.text}</p>
            <p className={styles.city}>
                {location.name}, {location.country}
            </p>
            <div className={styles.meta}>
                <span>Feels like {feelsLike}</span>
                {high && low && (
                    <>
                        <span className={styles.dot}>·</span>
                        <span>H: {high}</span>
                        <span className={styles.dot}>·</span>
                        <span>L: {low}</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default CurrentWeather;
