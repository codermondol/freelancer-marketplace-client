import { createBrowserRouter } from "react-router";
import root from "../root/root";
import Home from "../pages/home/home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import MyAddedJobs from "../pages/myaddedjobs/MyAddedjobs";
import MyAcceptTasks from "../pages/myaccepttasks/MyAcceptTasks";
import PrivateRoute from "./PrivateRoute";
import Category from "../pages/Category/Category";
import Jobs from "../pages/Jobs/Jobs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: root,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/jobs",
        loader: () => fetch("http://localhost:3000/alljobs"),
        Component: Jobs,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/categories/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/categories/${params.id}`),
        Component: Category,
      },
      {
        path: "/myaddedjobs",
        element: (
          <PrivateRoute>
            <MyAddedJobs></MyAddedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: "/myaccepttasks",
        element: (
          <PrivateRoute>
            <MyAcceptTasks></MyAcceptTasks>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
