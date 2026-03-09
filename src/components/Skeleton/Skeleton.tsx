import type { SkeletonProps } from '@/types/weather';
import styles from './Skeleton.module.css';

const Skeleton: React.FC<SkeletonProps> = ({ variant, count = 1 }) => {
    if (variant === 'current') {
        return (
            <div className={styles.currentSkeleton}>
                <div className={`${styles.block} ${styles.iconBlock}`} />
                <div className={`${styles.block} ${styles.tempBlock}`} />
                <div className={`${styles.block} ${styles.conditionBlock}`} />
                <div className={`${styles.block} ${styles.cityBlock}`} />
            </div>
        );
    }

    if (variant === 'hourly') {
        return (
            <div className={styles.hourlySkeleton}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={styles.hourItem}>
                        <div className={`${styles.block} ${styles.smallText}`} />
                        <div className={`${styles.block} ${styles.smallIcon}`} />
                        <div className={`${styles.block} ${styles.smallText}`} />
                    </div>
                ))}
            </div>
        );
    }

    if (variant === 'weekly') {
        return (
            <div className={styles.weeklySkeleton}>
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className={`${styles.block} ${styles.weekDay}`} />
                ))}
            </div>
        );
    }

    if (variant === 'details') {
        return (
            <div className={styles.detailsSkeleton}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className={`${styles.block} ${styles.detailCard}`} />
                ))}
            </div>
        );
    }

    // card variant
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className={`${styles.block} ${styles.cardBlock}`} />
            ))}
        </>
    );
};

export default Skeleton;
