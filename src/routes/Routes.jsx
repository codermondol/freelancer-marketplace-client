import { createBrowserRouter } from "react-router";
import root from "../root/root";
import Home from "../pages/home/home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: root,
    children: [
        {
            index: true,
            path: '/',
            Component: Home
        },
        {
            path: '/login',
            Component: Login
        },
        {
            path: '/register',
            Component: Register
        },
        {
            path: '/about',
            Component: About
        },
        {
            path: '/contact',
            Component: Contact
        }
    ]
  },
]);