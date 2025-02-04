import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
    	extend: {
    		colors: {
    			primary: {
    				'50': '#F0F7FE',
    				'100': '#DDEDFC',
    				'200': '#C3DFFA',
    				'300': '#9ACDF6',
    				'400': '#6AB1F0',
    				'500': '#4792EA',
    				'600': '#3276DE',
    				'700': '#2961CC',
    				'800': '#274FA6',
    				'900': '#254683'
    			},
    			gray: {
    				'50': '#F4F4F4',
    				'100': '#E8E8E9',
    				'200': '#D1D1D2',
    				'300': '#BABBBC',
    				'400': '#A3A4A5',
    				'500': '#767679',
    				'600': '#5F5F62',
    				'700': '#48494C',
    				'800': '#2A2B2E',
    				'900': '#15161A'
    			},
    			'red-light': '#FDF5F3',
    			'red-pure': '#F5BBAC',
    			'red-medium': '#8F3A25',
    			'red-dark': '#41180E',
    			'green-light': '#EFFAF3',
    			'green-pure': '#84D1A3',
    			'green-medium': '#164F34',
    			'green-dark': '#0A2419',
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		fontSize: {
    			xs: '12px',
    			sm: '14px',
    			md: '16px',
    			lg: '18px',
    			xl: '24px',
    			'2xl': '32px',
    			'3xl': '40px',
    			'4xl': '48px',
    			'5xl': '56px',
    			'6xl': '64px',
    			'7xl': '72px',
    			'8xl': '80px'
    		}
    	}
    },
    plugins: [require('tailwindcss-animate')],
} satisfies Config;
