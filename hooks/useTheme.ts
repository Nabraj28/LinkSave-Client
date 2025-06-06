import { ThemeContext } from '@/context/ThemeContext';
import { ThemeName } from '@/types';
import { useContext } from 'react';
import { themes } from './themes';


export function useTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const colors = themes[theme as ThemeName];

    return {
        theme,
        toggleTheme,
        colors,
    };
}