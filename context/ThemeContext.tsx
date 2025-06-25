import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: (theme: string) => { },
});

const THEME_STORAGE_KEY = '@app_theme';

interface ThemeProviderProps {
    children: React.ReactNode
}

export const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = ({ children }) => {
    const systemColorScheme = useColorScheme();
    const [theme, setTheme] = useState('light');

    const loadSavedTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme) {
                setTheme(savedTheme);
            } else {
                setTheme(systemColorScheme || 'light');
            }
        } catch (error) {
            console.error('Failed to load theme:', error);
        }
    };

    useEffect(() => {
        loadSavedTheme();
    }, []);

    const toggleTheme = async (theme: string) => {
        setTheme(theme);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

