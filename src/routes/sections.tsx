import type { RouteObject } from "react-router";

import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { varAlpha } from "minimal-shared/utils";

import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { DashboardLayout } from "../layouts/dashboard";

// ----------------------------------------------------------------------
import { NotFoundView } from "../sections/error/index";
export const HomePage = lazy(() => import("../pages/home"));
export const CompanyPage = lazy(() => import("../pages/company"));
export const ServicesPage = lazy(() => import("../pages/services"));
export const ServiceDetailPage = lazy(() => import("../pages/serviceDetail"));
export const SolutionsPage = lazy(() => import("../pages/solutions"));
export const SolutionDetailPage = lazy(() => import("../pages/solutionDetail"));
export const ResoursesPage = lazy(()=>import("../pages/resourses"))
export const NewsDetailPage = lazy(()=>import("../pages/newsDetail"))
export const CaseStudyDetailPage = lazy(()=>import("../pages/caseStudyDetail"))
export const TechnologyPage = lazy(() => import("../pages/technology"));
export const TechnologyDetailPage = lazy(() => import("../pages/technologyDetail"));
export const CareersPage = lazy(() => import("../pages/careers"));
export const CareerDetailPage = lazy(() => import("../pages/careerDetails"));
export const SupportPage = lazy(() => import("../pages/support"));
export const CountrySpecificPage = lazy(() => import("../pages/countrySpecific"));
export const QualitySustainabilityPage = lazy(() => import("../pages/qualitySustainablity"));

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
        path:"home",
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
      {
        path: "services",
        element: (
          <Suspense fallback={renderFallback()}>
            <ServicesPage />
          </Suspense>
        ),
      },
      {
        path: "service/:serviceId",
        element: (
          <Suspense fallback={renderFallback()}>
            <ServiceDetailPage />
          </Suspense>
        ),
      },
      {
        path: "solutions",
        element: (
          <Suspense fallback={renderFallback()}>
            <SolutionsPage />
          </Suspense>
        ),
      },
      {
        path: "solutions/:solutionId",
        element: (
          <Suspense fallback={renderFallback()}>
            <SolutionDetailPage />
          </Suspense>
        ),
      },
      {
        path: "resources",
        element: (
          <Suspense fallback={renderFallback()}>
            <ResoursesPage />
          </Suspense>
        ),
      },
      {
        path: "resources/news/:postId",
        element: (
          <Suspense fallback={renderFallback()}>
            <NewsDetailPage />
          </Suspense>
        ),
      },
      {
        path: "resources/case-study/:id",
        element: (
          <Suspense fallback={renderFallback()}>
            <CaseStudyDetailPage />
          </Suspense>
        ),
      },
      {
        path: "technology",
        element: (
          <Suspense fallback={renderFallback()}>
            <TechnologyPage />
          </Suspense>
        ),
      },
      {
        path: "technology/:id",
        element: (
          <Suspense fallback={renderFallback()}>
            <TechnologyDetailPage />
          </Suspense>
        ),
      },
      {
        path: "careers",
        element: (
          <Suspense fallback={renderFallback()}>
            <CareersPage />
          </Suspense>
        ),
      },
      {
        path: "careers/:id",
        element: (
          <Suspense fallback={renderFallback()}>
            <CareerDetailPage />
          </Suspense>
        ),
      },
      {
        path: "support",
        element: (
          <Suspense fallback={renderFallback()}>
            <SupportPage />
          </Suspense>
        ),
      },
      {
        path: "support/:id",
        element: (
          <Suspense fallback={renderFallback()}>
            <CountrySpecificPage />
          </Suspense>
        ),
      },
      {
        path: "quality-sustainability",
        element: (
          <Suspense fallback={renderFallback()}>
            <QualitySustainabilityPage />
          </Suspense>
        ),
      },
    ],
  },

  {
        path: "",
        element: <Navigate to="/home" replace />,
      },


  // {
  //   path: '404',
  //   element: <NotFoundView />,
  // },
  // { path: '*', element: <NotFoundView /> },
];
