import type { RouteObject } from "react-router";

import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { DashboardLayout } from "../layouts/dashboard";

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import("../pages/home"));
export const CompanyPage = lazy(() => import("../pages/company"));

const renderFallback = () => (
  <Box
    sx={{
      display: "flex",
      flex: "1 1 auto",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) =>
          varAlpha(theme.vars?.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={renderFallback()}>
             <HomePage />
         
          </Suspense>
        ),
      },
      {
        path: "company",
        element: (
          <Suspense fallback={renderFallback()}>
             <CompanyPage />
          </Suspense>
        ),
      },
    ],
  },
  // {
  //     path: '/',
  //     element: (
  //       <Suspense fallback={renderFallback()}>
  //         <HomePage />
  //       </Suspense>
  //     ),
  // }

  // {
  //   path: '404',
  //   element: <Page404 />,
  // },
  // { path: '*', element: <Page404 /> },
];
