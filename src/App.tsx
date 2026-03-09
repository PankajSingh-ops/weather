import { useState, useEffect, Suspense, lazy } from 'react';
import type { TemperatureUnit } from '@/types/weather';
import { useWeather } from '@/hooks/useWeather';
import { useGeolocation } from '@/hooks/useGeolocation';
import SearchBar from '@/components/SearchBar/SearchBar';
import CurrentWeather from '@/components/CurrentWeather/CurrentWeather';
import WeeklyForecast from '@/components/WeeklyForecast/WeeklyForecast';
import WeatherDetails from '@/components/WeatherDetails/WeatherDetails';
import UnitToggle from '@/components/UnitToggle/UnitToggle';
import Skeleton from '@/components/Skeleton/Skeleton';
import styles from './App.module.css';

const HourlyForecast = lazy(() => import('@/components/HourlyForecast/HourlyForecast'));

const LAST_CITY_KEY = 'weatherapp_lastCity';

const App: React.FC = () => {
  const [city, setCity] = useState<string>(() => {
    return localStorage.getItem(LAST_CITY_KEY) ?? 'London';
  });
  const [unit, setUnit] = useState<TemperatureUnit>('C');

  const { data, loading, error, refetch } = useWeather(city);

  const { getLocation } = useGeolocation((coords) => {
    setCity(coords);
  });

  useEffect(() => {
    localStorage.setItem(LAST_CITY_KEY, city);
  }, [city]);

  // Check for missing API key
  useEffect(() => {
    if (!import.meta.env.VITE_WEATHER_API) {
      console.warn('Weather API key is missing. Add VITE_WEATHER_API to your .env file.');
    }
  }, []);

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
  };

  const alerts = data?.alerts?.alert ?? [];

  return (
    <div className={styles.app}>
      {/* Animated Background */}
      <div className={styles.background} />
      <div className={`${styles.orb} ${styles.orb1}`} />
      <div className={`${styles.orb} ${styles.orb2}`} />
      <div className={`${styles.orb} ${styles.orb3}`} />

      {/* Main Content */}
      <main className={styles.content}>
        {/* Header: Search + Unit Toggle */}
        <div className={styles.header}>
          <div className={styles.searchArea}>
            <SearchBar onCitySelect={handleCitySelect} onLocationRequest={getLocation} />
          </div>
          <UnitToggle unit={unit} onToggle={setUnit} />
        </div>

        {/* Weather Alerts */}
        {alerts.length > 0 && (
          <div className={styles.alertsBanner}>
            <svg className={styles.alertIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div className={styles.alertContent}>
              <span className={styles.alertHeadline}>{alerts[0].headline}</span>
              <span className={styles.alertDesc}>{alerts[0].desc?.substring(0, 200)}</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className={styles.errorContainer}>
            <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              <line x1="8" y1="13" x2="8" y2="13.01" />
              <line x1="12" y1="13" x2="12" y2="13.01" />
              <line x1="16" y1="13" x2="16" y2="13.01" />
            </svg>
            <h2 className={styles.errorTitle}>
              {error === 'City not found' ? 'City Not Found' : 'Something Went Wrong'}
            </h2>
            <p className={styles.errorMessage}>
              {error === 'City not found'
                ? 'We couldn\'t find that city. Try another search.'
                : 'Please check your internet connection and try again.'}
            </p>
            <button className={styles.retryBtn} onClick={refetch}>
              Try Again
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className={styles.section}>
            <Skeleton variant="current" />
            <Skeleton variant="hourly" />
            <Skeleton variant="weekly" />
            <Skeleton variant="details" />
          </div>
        )}

        {/* Data State */}
        {data && !loading && !error && (
          <div className={styles.section}>
            <CurrentWeather data={data} unit={unit} />

            <Suspense fallback={<Skeleton variant="hourly" />}>
              <HourlyForecast
                hours={data.forecast.forecastday[0]?.hour ?? []}
                unit={unit}
              />
            </Suspense>

            <WeeklyForecast
              forecastDays={data.forecast.forecastday}
              unit={unit}
            />

            <WeatherDetails
              current={data.current}
              astro={data.forecast.forecastday[0]?.astro ?? {
                sunrise: '--',
                sunset: '--',
                moonrise: '--',
                moonset: '--',
                moon_phase: '--',
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
