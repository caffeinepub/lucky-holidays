import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import Layout from "./components/Layout";
import PasswordGate from "./components/PasswordGate";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Destination from "./pages/Destination";
import Home from "./pages/Home";
import Ratings from "./pages/Ratings";
import Vehicles from "./pages/Vehicles";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const vehiclesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vehicles",
  component: Vehicles,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const ratingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ratings",
  component: Ratings,
});

const destinationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/destination/$name",
  component: Destination,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  vehiclesRoute,
  contactRoute,
  ratingsRoute,
  destinationRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      {!unlocked && <PasswordGate onUnlock={() => setUnlocked(true)} />}
      {unlocked && <RouterProvider router={router} />}
    </QueryClientProvider>
  );
}
