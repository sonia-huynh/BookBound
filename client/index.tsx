import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { BrowserRouter as Router } from 'react-router-dom' // Import BrowserRouter
// import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout.tsx'
// import routes from './routes.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

// const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    /**
     * TODO: replace domain, clientId, and audience
     */
    <Auth0Provider
      domain=""
      clientId=""
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: '',
      }}
    >
      <QueryClientProvider client={queryClient}>
        {/* <RouterProvider router={router} /> */}
        <Router>
          <Layout />
        </Router>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
