import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import Home from "./components/pages/Home";
import Products from "./components/pages/Products";
import Aw26 from "./components/pages/aw26";
import Nosotros from "./components/pages/Nosotros";
import Comunidad from "./components/pages/comunidad";
import CartPage from "./components/pages/CartPage";

import LoginUserPage from "./components/pages/LoginUserPage";
import RegisterUserPage from "./components/pages/RegisterUserPage";

import AdminPanelPage from "./components/pages/AdminPanelPage";
import CreateProductPage from "./components/pages/CreateProductPage";
import EditProductPage from "./components/pages/EditProductPage";

import ProtectedRoute from "./components/layout/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/create",
        element: (
          <ProtectedRoute requireAdmin>
            <CreateProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/products/edit/:id",
        element: (
          <ProtectedRoute requireAdmin>
            <EditProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/aw26",
        element: <Aw26 />,
      },
      {
        path: "/Nosotros",
        element: <Nosotros />,
      },
      {
        path: "/comunidad",
        element: <Comunidad />,
      },
      {
        path: "/user/login",
        element: <LoginUserPage />,
      },
      {
        path: "/user/register",
        element: <RegisterUserPage />,
      },
      {
        path: "/admin/users",
        element: (
          <ProtectedRoute requireAdmin>
            <AdminPanelPage />
          </ProtectedRoute>
        ),
      },


      {
        path: "*",
        element: (
          <div>
            <h1>Error 404</h1>
            <p>Página no encontrada</p>
          </div>
        ),
      },

    ],
  },
]);