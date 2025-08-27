// frontend/src/pages/Secret.jsx
import { useState } from 'react';
import { Page, Grid } from '../ui/components';
import ReadingForm from '../components/ReadingForm';
import ReadingsList from '../components/ReadingsList';

export default function Secret() {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <Page>
      <Grid>
        <ReadingForm onCreated={() => setRefreshKey(k => k + 1)} />
        <ReadingsList refreshKey={refreshKey} />
      </Grid>
    </Page>
  );
}
