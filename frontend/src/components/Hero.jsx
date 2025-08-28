// frontend/src/components/Hero.jsx
import { Link } from 'react-router-dom';

export default function Hero({
  title = 'Welcome to your pocket oracle!',
  subtitle = 'Draw a card or login for more options.',
  ctaLabel = 'More',
  ctaTo = '/secret',
  position = 'center 35%',      // you control the crop via this prop
}) {
  return (
    <div
      className="hero"
      style={{
        '--hero-pos': position,       // used by CSS var
        backgroundPosition: position, // hard override (wins over other CSS)
      }}
    >
      <div className="content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-sub">{subtitle}</p>}
        {ctaLabel && <Link className="btn-accent" to={ctaTo}>{ctaLabel}</Link>}
      </div>
    </div>
  );
}
