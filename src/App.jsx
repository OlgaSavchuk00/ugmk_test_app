import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import StartPage from './pages/StartPage/StartPage';
import StatisticPage from './pages/StatisticPage/StatisticPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <StartPage />,
    },
    {
      path: "/details/:factory_id/:month",
      element: <StatisticPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
