import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <Login /> },
    { path: "/signUp", element: <SignUp /> },
    {path:"/dashboard",element:<Dashboard/>}
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
