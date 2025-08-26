// frontend/src/ui/theme.js
export const light = {
  colors: {
    bg: '#ffffff',
    page: '#f8fafc',
    text: '#111827',
    muted: '#6b7280',
    border: '#e5e7eb',
    primary: '#7c3aed',
    primaryHover: '#6d28d9',
    primaryText: '#ffffff',
    danger: '#dc2626',
    focus: '#2563eb',
  },
  radii: { sm: '8px', md: '12px', lg: '16px' },
  shadow: { sm: '0 1px 2px rgba(0,0,0,.06)', md: '0 6px 20px rgba(0,0,0,.08)' },
  space: (n) => `${n * 4}px`,
};

export const dark = {
  colors: {
    bg: '#0b1020',
    page: '#070b16',
    text: '#e5e7eb',
    muted: '#9ca3af',
    border: '#1f2937',
    primary: '#8b5cf6',
    primaryHover: '#7c3aed',
    primaryText: '#ffffff',
    danger: '#ef4444',
    focus: '#93c5fd',
  },
  radii: { sm: '8px', md: '12px', lg: '16px' },
  shadow: { sm: '0 1px 2px rgba(0,0,0,.25)', md: '0 6px 20px rgba(0,0,0,.35)' },
  space: (n) => `${n * 4}px`,
};

export const getTheme = (mode = 'light') => (mode === 'dark' ? dark : light);
