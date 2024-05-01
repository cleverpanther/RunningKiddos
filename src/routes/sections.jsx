import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const ClassPage = lazy(() => import('src/pages/class'));
export const QrCodePage = lazy(() => import('src/pages/qrcode'));
export const LoginPage = lazy(() => import('src/auth'));
export const ConfigPage = lazy(() => import('src/pages/config'));

export const Page404 = lazy(() => import('src/pages/page-not-found'));


// ----------------------------------------------------------------------

export default function Router() {
  localStorage.setItem("logStatus", "true");
  const status = localStorage.getItem("logstatus");


  const getAuthenticatedRoutes = () => [
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'index', element: <ClassPage />, index: true },
        { path: 'config', element: <ConfigPage /> },
        { path: 'qrcode', element: <QrCodePage /> }
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '',
      element: <Navigate to="/login" replace />,
    },
  ];

  const getUnauthenticatedRoutes = () => [
    { path: '*', element: <Navigate to="/login" replace /> },
    { path: 'login', element: <LoginPage /> },
  ];

  const routes = useRoutes(status === "true" ? getAuthenticatedRoutes() : getUnauthenticatedRoutes());

  return routes;
}
