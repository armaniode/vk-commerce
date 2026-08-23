import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { LegacyShowcase } from '@showcase/screens/showcase/LegacyShowcase';
import '@showcase/legacy.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root was not found');
}

createRoot(root).render(
  <StrictMode>
    <LegacyShowcase />
  </StrictMode>,
);
