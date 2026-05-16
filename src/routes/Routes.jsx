import { createBrowserRouter } from 'react-router';
import Root from '../root/root';
import Home from '../pages/home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import AllJobs from '../pages/Jobs/AllJobs';
import JobDetails from '../pages/Jobs/JobDetails';
import AddJob from '../pages/Jobs/AddJob';
import UpdateJob from '../pages/Jobs/UpdateJob';
import DeleteJob from '../pages/Jobs/DeleteJob';
import MyAddedJobs from '../pages/myaddedjobs/MyAddedJobs';
import MyAcceptedTasks from '../pages/myaccepttasks/MyAcceptedTasks';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: 'login', Component: Login },
      { path: 'register', Component: Register },
      { path: 'allJobs', Component: AllJobs },
      {
        path: 'allJobs/:id',
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },
      {
        path: 'addJob',
        element: (
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        ),
      },
      {
        path: 'updateJob/:id',
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
      },
      {
        path: 'deleteJob/:id',
        element: (
          <PrivateRoute>
            <DeleteJob />
          </PrivateRoute>
        ),
      },
      {
        path: 'myAddedJobs',
        element: (
          <PrivateRoute>
            <MyAddedJobs />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-accepted-tasks',
        element: (
          <PrivateRoute>
            <MyAcceptedTasks />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: '*', element: <ErrorPage /> },
]);
