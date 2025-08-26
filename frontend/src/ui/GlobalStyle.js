// frontend/src/ui/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,*::before,*::after{ box-sizing:border-box; }
  html,body,#root{ height:100%; }
  body{
    margin:0; background: ${({ theme }) => theme.colors.page};
    color:${({ theme }) => theme.colors.text};
    font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
  }
  a{ color:inherit; text-decoration:none; }
  :focus-visible{ outline:3px solid ${({ theme }) => theme.colors.focus}; outline-offset:2px; }
  @media (prefers-reduced-motion: reduce){
    *,*::before,*::after{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; scroll-behavior:auto !important; }
  }
`;
