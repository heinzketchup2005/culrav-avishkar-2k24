/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      bebas: ['Bebas Neue', 'sans-serif'],
      bionix: ['Bionix', 'sans-serif'],
      moon: ['"MOONGETTI"'], // Added
      sfText: ['"SF Pro Text"', 'Arial', 'sans-serif'],
    },
    extend: {
      screens: {
        'xs': '450px',
        custom1110: '1110px',   // Added
        custom1560: '1560px',   // Added
        custom1840: '1840px',   // Added
        custom1980: '1980px',   // Added
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        customOrange: "#f54e25",
        floral_white: "#FFFAF0",
        customGreen: "#35812a",
				flamingo_50: "#fff3ed",
        silver: "#c6c6c6",
        dark_primary: "#202020",
        dark_secondary: "#2d2d2d",
        Mine_Shaft_300: "#B0B0B0",
        Mine_Shaft_900: "#3D3D3D",
        Mine_Shaft_100: "#E7E7E7",
        Mine_Shaft_800: "#454545",
        Mine_Shaft_700: "#616161",
        custom_gray_100: "#d1d1d1",
        customRed: "#C43333",
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        navlink: "#FFFAF0",               // Added
        register: "#F54E25",              // Added
        scheduleOrange: "#F54E25",        // Added
        scheduleLargeText: "#2D2D2D",     // Added
        floralWhite: '#FFFAF0',           // Added
      },
    },
  },
  plugins: [require("tailwindcss-animate")]
}