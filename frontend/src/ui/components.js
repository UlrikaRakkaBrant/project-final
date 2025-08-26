// frontend/src/ui/components.js
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export const Page = styled.main`
  max-width: 960px;
  margin: 0 auto;
  padding: clamp(16px, 3vw, 32px);
`;

export const Card = styled.section`
  background:${({ theme }) => theme.colors.bg};
  border:1px solid ${({ theme }) => theme.colors.border};
  border-radius:${({ theme }) => theme.radii.lg};
  box-shadow:${({ theme }) => theme.shadow.sm};
  padding: clamp(16px, 3vw, 28px);
`;

export const H1 = styled.h1`margin: 0 0 12px; font-weight: 700;`;
export const H2 = styled.h2`margin: 0 0 8px; font-weight: 700; font-size:1.25rem;`;
export const Hint = styled.p`margin: 8px 0 16px; color:${({ theme }) => theme.colors.muted};`;

export const Field = styled.div`margin: 12px 0;`;
export const Label = styled.label`display:block; margin: 0 0 6px; font-weight:600;`;
export const Input = styled.input`
  width:100%; padding:12px 14px; border-radius:${({ theme }) => theme.radii.md};
  border:1px solid ${({ theme }) => theme.colors.border}; background:#fff;
  &:focus{ border-color:${({ theme }) => theme.colors.focus}; box-shadow:0 0 0 4px rgba(37,99,235,.15); }
  &[aria-invalid="true"]{ border-color:${({ theme }) => theme.colors.danger}; }
`;

export const ErrorText = styled.p`
  margin:6px 0 0; color:${({ theme }) => theme.colors.danger}; font-size:0.925rem;
`;

export const Button = styled.button`
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:12px 16px; border:0; border-radius:${({ theme }) => theme.radii.md};
  color:${({ theme }) => theme.colors.primaryText}; background:${({ theme }) => theme.colors.primary};
  cursor:pointer; font-weight:600; box-shadow:${({ theme }) => theme.shadow.sm};
  &:hover{ background:${({ theme }) => theme.colors.primaryHover}; }
  &:disabled{ opacity:.6; cursor:not-allowed; }
`;

export const GhostButton = styled(Button)`
  background: transparent; color: ${({ theme }) => theme.colors.text};
  border:1px solid ${({ theme }) => theme.colors.border};
  &:hover{ background: ${({ theme }) => theme.colors.page}; }
`;

export const Nav = styled.nav`
  background:${({ theme }) => theme.colors.bg};
  border-bottom:1px solid ${({ theme }) => theme.colors.border};
  padding: 10px 16px; margin-bottom: 16px;
  position: sticky; top: 0; z-index: 1;

  display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap;
  gap: 8px;
`;

export const NavGroup = styled.div`
  display:flex; align-items:center; gap:8px; flex-wrap:wrap;
`;

export const NavLink = styled(RouterLink)`
  padding: 6px 10px; border-radius:${({ theme }) => theme.radii.sm};
  &:hover{ background:${({ theme }) => theme.colors.page}; }
`;

export const Grid = styled.div`
  display:grid; gap:16px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;
