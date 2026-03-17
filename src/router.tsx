import { createBrowserRouter } from 'react-router-dom';

import { ArticlePage } from './pages/ArticlePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SectionPage } from './pages/SectionPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:section',
    element: <SectionPage />,
  },
  {
    path: '/:section/:slug',
    element: <ArticlePage />,
  },
  {
    path: '/:section/:subsection/:slug',
    element: <ArticlePage />,
  },
  {
    path: '/404',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
