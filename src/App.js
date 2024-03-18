import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import ListBill from "./pages/list/ListBill";
import ListCategory from "./pages/list/ListCategory";

import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs } from "./formSource";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import ListProduct from "./pages/list/ListProduct";
import UpdateProduct from "./pages/new/EditProduct";
import UpdateUser from "./pages/single/EditUser";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const currentUser = true;

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path="/users/:userId"
                element={
                  <RequireAuth>
                    <UpdateUser
                      inputs={userInputs}
                      title="Chỉnh sửa User"
                    />
                  </RequireAuth>
                }
              />
              {/* <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              /> */}
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <ListProduct />
                  </RequireAuth>
                }
              />
              <Route
                path="/products/:productId"
                element={
                  <RequireAuth>
                    <UpdateProduct
                      inputs={productInputs}
                      title="Edit Product"
                    />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route
              path="orders"
              index
              element={
                <RequireAuth>
                  <ListBill />
                </RequireAuth>
              }
            />
            <Route
              path="categories"
              index
              element={
                <RequireAuth>
                  <ListCategory />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
