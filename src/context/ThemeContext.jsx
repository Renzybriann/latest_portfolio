import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default to dark
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Function to get initial theme
    const getInitialTheme = () => {
      try {
        // Try to get saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
          return savedTheme;
        }
      } catch (error) {
        console.warn('localStorage not available:', error);
      }
      
      // Fallback to system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      
      return 'light';
    };

    // Set initial theme
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setIsInitialized(true);
  }, []);

  // Function to apply theme to DOM
  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('dark', 'light');
    
    // Add the new theme class
    if (newTheme === 'dark') {
      root.classList.add('dark');
    }
    // Note: 'light' class is optional since Tailwind defaults to light mode
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    applyTheme(newTheme);
    
    // Save to localStorage with error handling
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.warn('Could not save theme to localStorage:', error);
    }
  };

  // Don't render children until theme is initialized to prevent flash
  if (!isInitialized) {
    return <div className="min-h-screen bg-white dark:bg-black" />;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isInitialized }}>
      {children}
    </ThemeContext.Provider>
  );
};