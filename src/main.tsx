import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
);

// Built pages arrive prerendered (scripts/prerender.mjs): hydrate them.
// `npm run dev` serves an empty shell: render from scratch.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
