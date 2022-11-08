import Footer from "./Component/Footer";
import Nav from "./Component/Nav";
import MainContant from "./Component/MainContant";
import Card from "./Component/Cards/Card";
import {Routes , Route} from 'react-router-dom'
import DataNotFound from "./Component/DataNotFound";
import SignIn from "./Validation/SignIn";
import SignUp from "./Validation/SignUp";
import ResetPassword from "./Validation/ResetPassword";
import Cart from "./Component/Cart/Cart";
import UserRoute from "./UserRoute";
import AuthRoute from "./AuthRoute";
import Alert from "./Component/Alert";
import UserProvider from "./Provider/UserProvider";
import AlertProvider from "./Provider/AlertProvider";
import CartProvider from "./Provider/CartProvider";

function App() {  
  return (
    <>
      {/* <Test /> */}
      <div className="bg-gray-100 font-Poppins selection:text-white selection:bg-red-500 ">
        <UserProvider>
          <CartProvider>
            <AlertProvider>
              <Nav />

              <Alert />

              <div>
                <Routes>
                  <Route index element={<MainContant />}></Route>
                  <Route
                    path="/Component/Cards/Card/:id/"
                    element={<Card />}
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
