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
import TrialExpiredPopup from "./components/TrialExpiredPopup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Destination from "./pages/Destination";
import Home from "./pages/Home";
import Ratings from "./pages/Ratings";
import Vehicles from "./pages/Vehicles";

const queryClient = new QueryClient();

// Set to true to close the website to all users
const WEBSITE_CLOSED = true;

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

function WebsiteClosedScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white"
      data-ocid="website_closed.panel"
    >
      <div className="text-center px-6">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-4xl font-bold text-red-500 mb-4 tracking-widest uppercase">
          Website Closed
        </h1>
        <p className="text-gray-300 text-lg mb-2">
          This website is currently unavailable.
        </p>
        <p className="text-gray-400 text-sm">
          Please check back later or contact us for more information.
        </p>
        <div className="mt-8 border-t border-gray-700 pt-6">
          <p className="text-gray-500 text-xs">LAKKI HOLIDAYS</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [showTrialPopup, setShowTrialPopup] = useState(true);

  if (WEBSITE_CLOSED) {
    return <WebsiteClosedScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {!unlocked && <PasswordGate onUnlock={() => setUnlocked(true)} />}
      {unlocked && (
        <>
          <RouterProvider router={router} />
          <TrialExpiredPopup
            open={showTrialPopup}
            onClose={() => setShowTrialPopup(false)}
          />
        </>
      )}
    </QueryClientProvider>
  );
}
