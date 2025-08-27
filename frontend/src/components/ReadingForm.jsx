// frontend/src/components/ReadingForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReading } from '../services/readings';
import { Card, H2, Field, Label, Input, Button, ErrorText, Hint } from '../ui/components';

const SpreadEnum = z.enum(['one', 'three']);

const FormSchema = z.object({
  spread: SpreadEnum,
  title: z.string().optional(),
  notes: z.string().optional(),
  tags: z.string().optional(), // comma separated, we'll split to []
  // one-card fields
  oneCard: z.string().optional(),
  oneRev: z.boolean().optional(),
  // three-card fields
  past: z.string().optional(),
  pastRev: z.boolean().optional(),
  present: z.string().optional(),
  presentRev: z.boolean().optional(),
  future: z.string().optional(),
  futureRev: z.boolean().optional(),
});

export default function ReadingForm({ onCreated }) {
  const [error, setError] = useState('');
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(FormSchema), defaultValues: { spread: 'three' } });

  const spread = watch('spread');

  const onSubmit = async (data) => {
    setError('');

    // Build payload for the API
    const tags = (data.tags || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    let payload = {
      spread: data.spread,
      title: data.title || '',
      notes: data.notes || '',
      tags,
      cards: [],
    };

    if (data.spread === 'one') {
      if (!data.oneCard) { setError('Please enter the card.'); return; }
      payload.cards = [
        { id: data.oneCard, reversed: !!data.oneRev, position: 'Single' },
      ];
    } else {
      if (!data.past || !data.present || !data.future) {
        setError('Please fill in all three cards.');
        return;
      }
      payload.cards = [
        { id: data.past, reversed: !!data.pastRev, position: 'Past' },
        { id: data.present, reversed: !!data.presentRev, position: 'Present' },
        { id: data.future, reversed: !!data.futureRev, position: 'Future' },
      ];
    }

    try {
      await createReading(payload);
      reset({ spread: data.spread, title: '', notes: '', tags: '' });
      onCreated?.();
    } catch (e) {
      setError(e?.response?.data?.error || e.message);
    }
  };

  return (
    <Card>
      <H2>Create a Reading</H2>
      <Hint>Choose a spread, fill the cards, and save. Tags are optional (comma separated).</Hint>

      {error && <ErrorText>{error}</ErrorText>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <Label>Spread</Label>
          <select {...register('spread')}>
            <option value="one">One card</option>
            <option value="three">Three cards</option>
          </select>
        </Field>

        <Field>
          <Label>Title</Label>
          <Input placeholder="Daily check-in" {...register('title')} />
          {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
        </Field>

        <Field>
          <Label>Notes</Label>
          <Input placeholder="How are you feeling?" {...register('notes')} />
        </Field>

        <Field>
          <Label>Tags (comma separated)</Label>
          <Input placeholder="daily, mood" {...register('tags')} />
        </Field>

        {spread === 'one' ? (
          <>
            <Field>
              <Label>Card</Label>
              <Input placeholder="The Sun" {...register('oneCard')} />
            </Field>
            <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
              <input type="checkbox" {...register('oneRev')} /> Reversed
            </label>
          </>
        ) : (
          <>
            <Field>
              <Label>Past</Label>
              <Input placeholder="The Fool" {...register('past')} />
              <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
                <input type="checkbox" {...register('pastRev')} /> Reversed
              </label>
            </Field>

            <Field>
              <Label>Present</Label>
              <Input placeholder="The Sun" {...register('present')} />
              <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
                <input type="checkbox" {...register('presentRev')} /> Reversed
              </label>
            </Field>

            <Field>
              <Label>Future</Label>
              <Input placeholder="The Tower" {...register('future')} />
              <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', marginTop: 6 }}>
                <input type="checkbox" {...register('futureRev')} /> Reversed
              </label>
            </Field>
          </>
        )}

        <Button type="submit" disabled={isSubmitting} style={{ marginTop: 12 }}>
          {isSubmitting ? 'Saving…' : 'Save reading'}
        </Button>
      </form>
    </Card>
  );
}
