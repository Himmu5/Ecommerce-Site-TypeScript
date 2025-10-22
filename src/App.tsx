import Footer from "./Component/Ui-Component/Footer";
import Nav from "./Component/Home-Page/Nav/Nav";
import MainContant from "./Component/MainContant";
import { Routes, Route } from 'react-router-dom'
import DataNotFound from "./Component/Error-Component/DataNotFound";
import SignIn from "./Component/Validation/SignIn";
import SignUp from "./Component/Validation/SignUp";
import ResetPassword from "./Component/Validation/ResetPassword";
import Cart from "./Component/Cart/Cart";
import AuthRoute from "./Component/Auth/AuthRoute";
import Alert from "./Component/AlertStory/Alert";
import UserProvider from "./Component/Provider/UserProvider";
import AlertProvider from "./Component/Provider/AlertProvider";
import CartProvider from "./Component/Provider/CartProvider";
import ProductDetail from "./Component/Cards/ProductDetail";
import Home from "./Component/Home-Page/Home-page/Home";
import About from "./Component/Cards/About";
import Contact from "./Component/Ui-Component/Contact";

function App() {


  return (
    <>
      {/* <Test /> */}
      <div className="bg-white font-Poppins selection:text-white selection:bg-red-500 min-h-screen">
        <UserProvider>
          <CartProvider>
            <AlertProvider>

              <Nav />
              <Alert />

              <div>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/AllProducts" element={<MainContant />}></Route>
                  <Route
                    path="/Component/Cards/Card/:id/"
                    element={<ProductDetail />}
                  ></Route>
                  <Route path="*" element={<DataNotFound />}></Route>
                  <Route path="/component/Cart/Cart" element={<Cart />}></Route>

                  <Route
                    path="/component/validation/SignIn"
                    element={
                      <AuthRoute>
                        <SignIn />
                      </AuthRoute>
                    }
                  ></Route>
                  <Route
                    path="/component/validation/SignUp"
                    element={
                      <AuthRoute>
                        <SignUp />
                      </AuthRoute>
                    }
                  ></Route>
                  <Route
                    path="/component/validation/ResetPassword"
                    element={<ResetPassword />}
                  ></Route>
                  <Route
                    path="/Contact"
                    element={<Contact />}
                  ></Route>
                  <Route
                    path="/About"
                    element={<About />}
                  ></Route>
                </Routes>
              </div>
            </AlertProvider>
          </CartProvider>
        </UserProvider>
        <Footer />
      </div>
    </>
  );
}

export default App;
