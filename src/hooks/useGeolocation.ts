import { useState } from 'react';

interface GeolocationState {
    loading: boolean;
    error: string | null;
}

export const useGeolocation = (
    onSuccess: (coords: string) => void
): GeolocationState & { getLocation: () => void } => {
    const [state, setState] = useState<GeolocationState>({
        loading: false,
        error: null,
    });

    const getLocation = () => {
        if (!navigator.geolocation) {
            setState({ loading: false, error: 'Geolocation not supported' });
            return;
        }

        setState({ loading: true, error: null });

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
                onSuccess(coords);
                setState({ loading: false, error: null });
            },
            (err) => {
                let message = 'Location access denied';
                if (err.code === 2) message = 'Location unavailable';
                if (err.code === 3) message = 'Location request timed out';
                setState({ loading: false, error: message });
            },
            { timeout: 10000, enableHighAccuracy: false }
        );
    };

    return { ...state, getLocation };
};
