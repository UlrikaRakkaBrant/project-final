// frontend/src/ui/theme.js

// "Moonlight landscape" palette
const light = {
  // page + card
  page: '#bab095',   // page background
  bg: '#ffffff',   // card/nav background
  border: '#e3eaeb',

  // text
  text: '#1f2426',   // main text (also navbar/hero text)
  muted: '#6c7a7d',

  // brand
  primary: '#d1a84a', // moonlight gold
  primaryHover: '#bf983f',
  primaryText: '#1b1f23', // dark text on gold

  // states
  focus: '#2563eb',
  danger: '#e5484d',
};

const dark = {
  page: '#0f1416',
  bg: '#161d1f',
  border: '#2a3437',

  text: '#e7ecec',
  muted: '#95a3a7',

  primary: '#d1a84a',
  primaryHover: '#c09941',
  primaryText: '#0f1416',

  focus: '#4f83ff',
  danger: '#ff6b6b',
};

export function getTheme(mode = 'light') {
  const colors = mode === 'dark' ? dark : light;
  return {
    mode,
    colors,
    radii: { sm: '8px', md: '12px', lg: '16px' },
    shadow: { sm: '0 4px 14px rgba(0,0,0,.06)' },
  };
}

