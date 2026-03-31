import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

export const render = (url: string) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity },
    },
  });

  const html = renderToString(
    <QueryClientProvider client={queryClient}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </QueryClientProvider>
  );

  return { html };
};
