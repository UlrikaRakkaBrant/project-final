// frontend/src/components/WhatsNext.jsx
import { H2, Hint } from '../ui/components';

export default function WhatsNext() {
  return (
    <>
      <H2>What’s next?</H2>
      <ul style={{ margin: '8px 0 0 18px' }}>
        <li>One card draw</li>
        <li>Three card spread - Your Focal Point</li>
        <li>Comment and save</li>
      </ul>
      <Hint style={{ marginTop: 8 }}>
        After signing in, you’ll land on your dashboard where you can draw cards,
        save readings, and revisit your history.
      </Hint>

    </>
  );
}
