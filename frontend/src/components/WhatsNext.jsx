// frontend/src/components/WhatsNext.jsx
import { H2, Hint } from '../ui/components';

export default function WhatsNext() {
  return (
    <>
      <H2>What’s next?</H2>
      <ul style={{ margin: '8px 0 0 18px' }}>
        <li>Daily Card (per-user) with history</li>
        <li>Readings (1–3 card spreads) with notes</li>
        <li>Saved spreads and journal</li>
      </ul>
      <Hint style={{ marginTop: 8 }}>
        The “Secret” link is your temporary dashboard—JWT-protected and ready to expand.
      </Hint>
    </>
  );
}
