/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/escaperoom/**/*.{js,ts,jsx,tsx}",
  ],
  important: '.escaperoom-wrapper',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0d1117',
          dark: '#010409',
          light: '#161b22',
        },
        secondary: {
          DEFAULT: '#58a6ff',
          dark: '#1f6feb',
          light: '#79c0ff',
        },
        accent: {
          DEFAULT: '#f85149',
          dark: '#da3633',
          light: '#ff7b72',
        },
        success: '#3fb950',
        error: '#f85149',
        warning: '#d29922',
        background: '#0d1117',
        surface: '#161b22',
        'surface-light': '#21262d',
        'code-green': '#7ee787',
        'code-purple': '#d2a8ff',
        'code-orange': '#ffa657',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
        display: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(88, 166, 255, 0.4)',
        'glow-green': '0 0 20px rgba(126, 231, 135, 0.4)',
        'dark': '0 10px 40px rgba(0, 0, 0, 0.8)',
        'terminal': '0 0 30px rgba(88, 166, 255, 0.2), inset 0 0 20px rgba(88, 166, 255, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'code-pattern': 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
        'terminal-glow': 'linear-gradient(180deg, rgba(88, 166, 255, 0.1) 0%, transparent 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
