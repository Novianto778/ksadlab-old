'use client';

import { useEffect, useState } from 'react';

const useDarkMode = () => {
    const [theme, setTheme] = useState('light');

    const setMode = (mode: string) => {
        window.localStorage.setItem('theme', mode);
        setTheme(mode);
    };

    const toggleTheme = () => {
        theme === 'light' ? setMode('dark') : setMode('light');
    };

    // set id root with theme class
    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');

        setMode(localTheme || 'light');
        const root = window.document.documentElement;

        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
    }, [theme]);

    return {
        theme,
        toggleTheme,
    };
};

export default useDarkMode;
