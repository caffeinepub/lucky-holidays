import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Vehicles from './pages/Vehicles';
import Contact from './pages/Contact';
import Ratings from './pages/Ratings';
import Destination from './pages/Destination';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const vehiclesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/vehicles',
  component: Vehicles,
});

const destinationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/destination/$name',
  component: Destination,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const ratingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/ratings',
  component: Ratings,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  vehiclesRoute,
  destinationRoute,
  contactRoute,
  ratingsRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
