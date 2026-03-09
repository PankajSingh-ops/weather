export const getDayName = (dateStr: string, short: boolean = false): string => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: short ? 'short' : 'long' });
};

export const formatHour = (timeStr: string): string => {
    const date = new Date(timeStr.replace(' ', 'T'));
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
};

export const isCurrentHour = (timeStr: string): boolean => {
    const date = new Date(timeStr.replace(' ', 'T'));
    const now = new Date();
    return date.getHours() === now.getHours() &&
        date.getDate() === now.getDate();
};

export const isToday = (dateStr: string): boolean => {
    const date = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    return date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();
};
