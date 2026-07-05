/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#7367F0',
        'primary-grad-from': '#8BA6FF',
        'primary-grad-to': '#3762EE',
        link: '#3666EE',
        body: '#6E6B7B',
        'text-secondary': '#5E5873',
        dark: '#1F1E23',
        muted: '#727273',
        'muted-light': '#B9B9C3',
        'border-input': '#D8D6DE',
        'bg-body': '#F8F8F8',
        'sidebar-card': '#F4F5F8',
        'logout-bg': '#E1E7F1',
        success: '#28C76F',
        'success-bg': '#E9FBF0',
        warning: '#FF9F43',
        danger: '#EA5455',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        heading: ['"Poppins"', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
      },
      boxShadow: {
        navbar: '0px 4px 24px 0px rgba(0,0,0,0.12)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(200deg, #8BA6FF 27%, #3762EE 83%)',
      },
      spacing: {
        sidebar: '260px',
      },
    },
  },
  plugins: [],
}
