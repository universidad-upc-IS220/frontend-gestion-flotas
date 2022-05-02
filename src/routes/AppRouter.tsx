import { HashRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/Login';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRouter } from './PrivateRouter';

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <PrivateRouter>
              <DashboardRoutes />
            </PrivateRouter>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
