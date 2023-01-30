import { QueryClient, QueryClientProvider } from 'react-query';

import Logo from '~/assets/logo-lr.png';
import { Dashboard, Header, Sidebar } from '~/components';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="main d-flex">
        <Sidebar logo={Logo} />
        <div className="d-flex flex-column w-100">
          <Header title="Liferay" content="liferay-portal" />
          <Dashboard />
        </div>
      </main>
    </QueryClientProvider>
  );
}
