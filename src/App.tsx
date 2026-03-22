import 'highlight.js/styles/atom-one-dark.css';
import { ThemeProvider } from 'styled-components';

import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

function App() {
	return (
		<HelmetProvider>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<RouterProvider router={router} />
			</ThemeProvider>
		</HelmetProvider>
	);
}

export default App;
