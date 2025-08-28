import { Link } from 'react-router-dom';

export default function Hero({
  title = "Welcome to your pocket oracle!",
  subtitle = "Choose a card or go for the luxury truth.",
  ctaLabel = "More",
  ctaTo = "/secret"
}) {
  return (
    <div className="hero">
      <div className="content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-sub">{subtitle}</p>}
        {ctaLabel && <Link className="btn-accent" to={ctaTo}>{ctaLabel}</Link>}
      </div>
    </div>
  );
}
