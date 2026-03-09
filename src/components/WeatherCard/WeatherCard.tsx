import type { WeatherCardProps } from '@/types/weather';
import styles from './WeatherCard.module.css';

const WeatherCard: React.FC<WeatherCardProps> = ({ icon, label, value, subValue }) => {
    return (
        <div className={styles.card}>
            <div className={styles.iconWrapper}>{icon}</div>
            <div className={styles.info}>
                <span className={styles.label}>{label}</span>
                <span className={styles.value}>{value}</span>
                {subValue && <span className={styles.subValue}>{subValue}</span>}
            </div>
        </div>
    );
};

export default WeatherCard;
