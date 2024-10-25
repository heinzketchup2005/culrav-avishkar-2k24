/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		fontFamily: {
		  bebas: ['Bebas Neue', 'sans-serif'],
		  bionix: ['Bionix', 'sans-serif'],
		  moon: ['"MOONGETTI"'], // Added
		  Sfpro:['"Sfpro"'] , // added recen
		  Manrope:['"Manrope"'] // afded recent
		},
		screens: {
		  'xs': '450px',
		  custom1110: '1110px',   
		  custom1000: '1000px',   
		  custom1560: '1560px',   
		  custom1840: '1840px',   
		  custom1980: '1980px',  
		  custom1400:'1400px', // recent added
		},
		borderRadius: {
		  lg: 'var(--radius)',
		  md: 'calc(var(--radius) - 2px)',
		  sm: 'calc(var(--radius) - 4px)'
		},
		colors: {
		  customOrange: "#f54e25",
		  floral_white: "#FFFAF0",
		  silver: "#c6c6c6",
		  dark_primary: "#202020",
		  dark_secondary: "#2d2d2d",
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		  },
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		  },
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  chart: {
			'1': 'hsl(var(--chart-1))',
			'2': 'hsl(var(--chart-2))',
			'3': 'hsl(var(--chart-3))',
			'4': 'hsl(var(--chart-4))',
			'5': 'hsl(var(--chart-5))'
		  },
		  navlink: "#FFFAF0",               
		  register: "#F54E25",              
		  scheduleOrange: "#F54E25",        
		  scheduleLargeText: "#2D2D2D" ,    
		  floralWhite: '#FFFAF0',           
		  lightMineshaft: "#3D3D3D", // added
		  veryLightMineShaft: "#B0B0B0", //added
		  medMineShaft: "#6D6D6D",
		  mineShaft:'#B0B0B0',
		}
	  }
	},
	plugins: [require("tailwindcss-animate")],
  }
  