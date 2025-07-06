import { Navigate, Outlet } from "react-router-dom";
import type { RouteObject } from "react-router";

import { DashboardLayout } from "../layouts/dashboard";
import { NotFoundView } from "../sections/error/index";

import HomePage from "../pages/home";
import CompanyPage from "../pages/company";
import ServicesPage from "../pages/services";
import ServiceDetailPage from "../pages/serviceDetail";
import SolutionsPage from "../pages/solutions";
import SolutionDetailPage from "../pages/solutionDetail";
import ResoursesPage from "../pages/resourses";
import NewsDetailPage from "../pages/newsDetail";
import CaseStudyDetailPage from "../pages/caseStudyDetail";
import TechnologyPage from "../pages/technology";
import TechnologyDetailPage from "../pages/technologyDetail";
import CareersPage from "../pages/careers";
import CareerDetailPage from "../pages/careerDetails";
import SupportPage from "../pages/support";
import CountrySpecificPage from "../pages/countrySpecific";
import QualitySustainabilityPage from "../pages/qualitySustainablity";
import MyBlackboxFrightPage from "../pages/myBlackBoxFright";
import TrackingPage from "../pages/tracking";
import PrivacyPolicyPage from "../pages/general";
import SearchPage from "../pages/search";

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      { index: true, path: "home", element: <HomePage /> },
      { path: "company", element: <CompanyPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "service/:serviceId", element: <ServiceDetailPage /> },
      { path: "solutions", element: <SolutionsPage /> },
      { path: "solution/:solutionId", element: <SolutionDetailPage /> },
      { path: "resources", element: <ResoursesPage /> },
      { path: "resources/news/:postId", element: <NewsDetailPage /> },
      { path: "resources/case-study/:id", element: <CaseStudyDetailPage /> },
      { path: "technology", element: <TechnologyPage /> },
      { path: "technology/:id", element: <TechnologyDetailPage /> },
      { path: "careers", element: <CareersPage /> },
      { path: "careers/:id", element: <CareerDetailPage /> },
      { path: "support", element: <SupportPage /> },
      { path: "support/:id", element: <CountrySpecificPage /> },
      { path: "quality-sustainability", element: <QualitySustainabilityPage /> },
      { path: "my-blackbox-freight", element: <MyBlackboxFrightPage /> },
      { path: "tracking", element: <TrackingPage /> },
      { path: "general/:uri", element: <PrivacyPolicyPage /> },
      { path: "search", element: <SearchPage /> },
    ],
  },
  {
    path: "",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "404",
    element: <NotFoundView />,
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
];
