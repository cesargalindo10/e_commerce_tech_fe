import { lazy } from 'react';
import { Navigate, Route } from 'react-router-dom';
import RoutesWithNotFound from '../utilities/RoutesWithNotFound';
import { PrivateRoutes } from '../models/routes';


const Dashboard = lazy(() => import('./Dashboard/Dashboard'));


function Private() {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD} />} />
      <Route path={PrivateRoutes.DASHBOARD + '/*'} element={<Dashboard />} />

    </RoutesWithNotFound>
  );
}
export default Private;
