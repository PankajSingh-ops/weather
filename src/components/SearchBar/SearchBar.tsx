import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearch } from '@/hooks/useSearch';
import type { SearchBarProps } from '@/types/weather';
import styles from './SearchBar.module.css';

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect, onLocationRequest }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { results } = useSearch(query);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    // Open dropdown when results arrive
    useEffect(() => {
        if (results.length > 0) {
            setIsOpen(true);
            setActiveIndex(-1);
        }
    }, [results]);

    const handleSelect = useCallback((city: string) => {
        onCitySelect(city);
        setQuery('');
        setIsOpen(false);
        inputRef.current?.blur();
    }, [onCitySelect]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || results.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault();
            const selected = results[activeIndex];
            handleSelect(`${selected.name}, ${selected.country}`);
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    const handleClear = () => {
        setQuery('');
        setIsOpen(false);
        inputRef.current?.focus();
    };

    return (
        <div className={styles.wrapper} ref={wrapperRef}>
            <div className={styles.inputContainer}>
                {/* Search Icon */}
                <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input
                    ref={inputRef}
                    type="text"
                    className={styles.input}
                    placeholder="Search for a city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => results.length > 0 && setIsOpen(true)}
                    autoComplete="off"
                    id="city-search"
                />

                {query && (
                    <button className={styles.clearBtn} onClick={handleClear} aria-label="Clear search">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                )}

                {/* GPS Button */}
                <button className={styles.gpsBtn} onClick={onLocationRequest} aria-label="Use my location" title="Use my location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4" />
                        <line x1="12" y1="2" x2="12" y2="6" />
                        <line x1="12" y1="18" x2="12" y2="22" />
                        <line x1="2" y1="12" x2="6" y2="12" />
                        <line x1="18" y1="12" x2="22" y2="12" />
                    </svg>
                </button>
            </div>

            {/* Dropdown */}
            {isOpen && results.length > 0 && (
                <ul className={styles.dropdown} role="listbox">
                    {results.map((r, i) => (
                        <li
                            key={r.id}
                            className={`${styles.dropdownItem} ${i === activeIndex ? styles.active : ''}`}
                            onClick={() => handleSelect(`${r.name}, ${r.country}`)}
                            onMouseEnter={() => setActiveIndex(i)}
                            role="option"
                            aria-selected={i === activeIndex}
                        >
                            <svg className={styles.pinIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <div className={styles.resultText}>
                                <span className={styles.cityName}>{r.name}</span>
                                <span className={styles.region}>{r.region}, {r.country}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
