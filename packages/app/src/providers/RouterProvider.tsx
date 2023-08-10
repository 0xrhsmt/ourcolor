import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider as ReactRouterProvider,
  Route,
} from 'react-router-dom';

import RootLayout from '../pages/rootLayout';
import IndexPage from '../pages';
import ColorsIndexPage from '../pages/colors';
import ColorsNewPage from '../pages/colors/new';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="/colors">
          <Route index element={<ColorsIndexPage />} />
          <Route path="new" element={<ColorsNewPage />} />
        </Route>
      </Route>
    </>
  )
);

export const RouterProvider = () => <ReactRouterProvider router={router} />;

export default RouterProvider;
