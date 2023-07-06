import { Outlet } from 'react-router-dom';

import Nav from '../components/Nav';
function RootLayout() {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
