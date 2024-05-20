import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

interface DarkModeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}
interface DarkModeProviderProps {
    children: React.ReactNode;
}

const DarkModeContext = createContext<DarkModeContextType>({
    isDarkMode: false,
    toggleDarkMode: () => {},
});

const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    // matches dark mode if operation system on user is on dark mode
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia("(prefers-color-scheme: dark)").matches, "isDarkMode");

    // const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isDarkMode]);

    function toggleDarkMode() {
        setIsDarkMode((isDark) => !isDark);
    }

    return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === undefined) throw new Error("DarkModeContext was used outside of DarkModeProvider");
    return context;
}

export { DarkModeProvider, useDarkMode };
