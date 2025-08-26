import { ErrorPage } from "@/components/Error/ErrorPage";
import { Navbar } from "@/components/Navbar/Navbar";
import { ThemeContextProvider } from "@/providers/ThemeProvider";
import { TanstackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <>
        <HeadContent />

        <ThemeContextProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Outlet />
            </main>
          </div>
        </ThemeContextProvider>

        <TanstackDevtools
          config={{
            position: "bottom-left",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </>
    ),
    notFoundComponent: () => {
      return (
        <ErrorPage message="I'm sorry, but the page you are looking for is not here" />
      );
    },
  }
);
