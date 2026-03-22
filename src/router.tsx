import { createBrowserRouter } from 'react-router-dom';

import { ContentRouter } from './pages/ContentRouter';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/404',
		element: <NotFoundPage />,
	},
	{
		path: '*',
		element: <ContentRouter />,
	},
]);
