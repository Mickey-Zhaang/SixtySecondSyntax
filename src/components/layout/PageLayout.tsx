import styled from 'styled-components';

import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface PageLayoutProps {
	children: React.ReactNode;
	hideSidebar?: boolean;
}

export function PageLayout({ children, hideSidebar = false }: PageLayoutProps) {
	return (
		<Wrapper>
			<Header />
			<Body>
				{!hideSidebar && <Sidebar />}
				<Main>
					{children}
					<Footer />
				</Main>
			</Body>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`;

const Body = styled.div`
	display: flex;
	flex: 1;
`;

const Main = styled.main`
	flex: 1;
	min-width: 0;
	overflow-x: hidden;
`;
