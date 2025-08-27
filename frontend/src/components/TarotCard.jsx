import { imageUrlForCard } from '../lib/tarotImages';

export default function TarotCard({ card, title, hoverText }) {
  const src = card ? imageUrlForCard(card) : '/card-back.svg';
  const style = {
    transform: card?.reversed ? 'rotate(180deg)' : 'none',
    transition: 'transform .2s ease',
  };

  return (
    <div className="overlay-wrap" style={{ textAlign: 'center' }}>
      <img className="tarot-img" src={src} alt={card?.name || 'Card back'} style={style}
        onError={(e) => { e.currentTarget.src = '/card-back.svg'; }} />
      {hoverText && <div className="overlay"><strong>{title}</strong><br />{hoverText}</div>}
      {card && (
        <>
          <div style={{ marginTop: 8, fontWeight: 700 }}>{card.name}{card.reversed ? ' (reversed)' : ''}</div>
          <div style={{ fontSize: 13, opacity: .8, marginTop: 4 }}>
            {card.reversed ? (card.meaning_rev || 'Reversed meaning') : (card.meaning_up || 'Meaning')}
          </div>
        </>
      )}
    </div>
  );
}
