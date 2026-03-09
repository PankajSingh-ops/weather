import type { UnitToggleProps } from '@/types/weather';
import styles from './UnitToggle.module.css';

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
    return (
        <div className={styles.toggle}>
            <button
                className={`${styles.btn} ${unit === 'C' ? styles.active : ''}`}
                onClick={() => onToggle('C')}
                aria-label="Celsius"
            >
                °C
            </button>
            <button
                className={`${styles.btn} ${unit === 'F' ? styles.active : ''}`}
                onClick={() => onToggle('F')}
                aria-label="Fahrenheit"
            >
                °F
            </button>
        </div>
    );
};

export default UnitToggle;
