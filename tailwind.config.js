/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        // Mobile-first breakpoints
        screens: {
            'xs': '375px',   // iPhone SE
            'sm': '640px',   // Small tablets
            'md': '768px',   // Tablets
            'lg': '1024px',  // Laptops
            'xl': '1280px',  // Desktops
            '2xl': '1536px', // Large screens
        },
        extend: {
            colors: {
                background: {
                    primary: '#0a0a0f',
                    secondary: '#12121a',
                    tertiary: '#1a1a2e',
                },
                accent: {
                    DEFAULT: '#6366f1',
                    light: '#818cf8',
                    dark: '#4f46e5',
                },
                success: '#10b981',
                warning: '#f59e0b',
                error: '#ef4444',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            // Mobile-first spacing
            spacing: {
                '18': '4.5rem',
                'safe': 'env(safe-area-inset-bottom)',
            },
            // Touch target sizes (iOS HIG minimum: 44px, Material Design: 48px)
            minHeight: {
                'touch': '44px',
                'touch-lg': '48px',
            },
            minWidth: {
                'touch': '44px',
                'touch-lg': '48px',
            },
            // Safe area insets for modern devices
            padding: {
                'safe-top': 'env(safe-area-inset-top)',
                'safe-bottom': 'env(safe-area-inset-bottom)',
                'safe-left': 'env(safe-area-inset-left)',
                'safe-right': 'env(safe-area-inset-right)',
            },
            // Animation durations
            transitionDuration: {
                '250': '250ms',
                '350': '350ms',
            },
        },
    },
    plugins: [],
}
