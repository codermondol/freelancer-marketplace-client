import { Outlet, ScrollRestoration } from 'react-router';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Root = () => {
  return (
    <div className="flex min-h-screen flex-col bg-app text-app">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Root;
