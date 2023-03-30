import App from '../App';
import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout/Admin';
import routes from 'config/routes';
import { LoginPage } from 'features/auth/pages/LoginPage';
import Dashboard from 'features/dashboard';
import StudentFeature from 'features/student';
import AddEditPage from 'features/student/pages/AddEditPage';
import ListPage from 'features/student/pages/ListPage';
import { createBrowserRouter } from 'react-router-dom';

const privateRoutes = [
  {
    path: routes.admin,
    element: <PrivateRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: routes.dashboard,
            element: <Dashboard />,
          },
          {
            path: routes.students,
            element: <StudentFeature />,
            children: [
              {
                index: true,
                element: <ListPage />,
              },
              {
                path: routes.add,
                element: <AddEditPage />,
              },
              {
                path: routes.detailById,
                element: <AddEditPage />,
              },
            ],
          },
        ],
      },
    ],
  },
];

const publicRoutes = [
  {
    path: routes.home,
    element: <App />,
    children: [
      {
        path: routes.login,
        element: <LoginPage />,
      },
      ...privateRoutes,
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export const router = createBrowserRouter([...publicRoutes]);
