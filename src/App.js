import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../src/ShareModule/Navbar";
import Footer from "../src/ShareModule/Footer";
import { useDispatch } from "react-redux";
import { Suspense, lazy, useEffect } from "react";
import Loader from "./Component/Loader/Loader";
import { check_token } from "./ReduxToolkit/AuthSlice";
import { ToastContainer } from "react-toastify";
const Home = lazy(() => import("../src/Component/Product/Home"));
const Login = lazy(() => import("../src/Component/Auth/Login"));
const Register = lazy(() => import("../src/Component/Auth/Register"));
const CreateProduct = lazy(() => import("../src/Component/Product/CreateProduct"));
const ProductList = lazy(() => import("../src/Component/Product/ProductList"));
const Update = lazy(() => import("../src/Component/Product/Update"));
function App() {
  const dispatch = useDispatch();

  
  function PrivateRoute({ children }) {
    console.log(children, "children");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    // useEffect(() => {
    //   localStorage.setItem("pathname", location?.pathname);
    // }, [location]);

    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {alert("Please go for login either you can't access product list")}
        
   
      </>
    

    );
  }

  const PublicRouteNames = [
    {
      path: "/register",
      Component: <Register />,
    },
    {
      path: "/login",
      Component: <Login />,
    },
    {
      path: "/",
      Component: <Home />, 
    },

  ];

  const PrivateRouteNames = [
   
    {
      path: "/createe",
      Component: <CreateProduct />,
    },

    {
      path: "/productlist",
      Component: <ProductList />,
    },

    {
      path: "/update/:id",
      Component: <Update />,
    },
  ];

  useEffect(() => {
    dispatch(check_token())
   }, [])
  return (
    <>
    <Suspense fallback={<h2>Loading.....</h2>}>
    <Router>
        <Navbar />
        <Routes>
          {PublicRouteNames?.map((route, index) => {
            return (
              <Route
                // key={index + 1}
                exact
                path={route.path}
                element={route.Component}
              />
            );
          })}

          {/**************  protected routes *********************/}

          {PrivateRouteNames?.map((route, index) => {
            return (
              <Route
                // key={index + 2}
                path={route.path}
                element={<PrivateRoute>{route.Component}</PrivateRoute>}
              />
            );
          })}
        </Routes>
        <Footer />
      </Router>

    </Suspense>
   
    </>
  );
}

export default App;
