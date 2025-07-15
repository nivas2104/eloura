import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './pages2/register/register.js'
import Explore from './pages2/explore/explore.js';
import Login from './pages2/login/login.js';
import VRScene from './pages2/vr-1/vr.js';
import Travel from './site_page/Travel.js';
import PlaceDetails from './site_page/PlaceDetails.js';
import TravelAgent from './pages2/travelAgent/TravelAgent.js';
import StreetView from './pages2/streetView/streetView.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/explore",
    element: (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Explore />
      </div>
    ),
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/explore/:place",
    element: <VRScene />,
  },
  {
    path: "/travel/:place",
    element: <PlaceDetails />
  },
  {
    path: "/travel-agent",
    element: <TravelAgent />
  },
  {
    path: "/streetview/:place",
    element: <StreetView />
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
