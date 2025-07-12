import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DefaultPage from "./Components/DefaultPage";
import Add from "./Components/Add";
import Home from "./Components/Home";
import CartPage from "./Components/CartPage";
import PrintTheBill from "./Components/PrintBill";
import AllBillsPage from "./Components/AllBillsPage";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { AuthProvider, useAuth } from "./Components/AuthContext";
import ManageStore from "./Components/ManageStore";
import SingleManagerAnalysis from "./Components/SingleManagerAnalysis";
import CreateManagerByAdmin from "./Components/CreateManagerByAdmin";

function NavBar() {
  const { user, logout } = useAuth();
  return (
    <nav className="p-4 bg-gray-100 flex gap-4">
      {!user ? (
        <>
          <a href="/register" className="text-blue-600">
            Register
          </a>
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </>
      ) : (
        <button onClick={logout} className="text-red-600">
          Logout
        </button>
      )}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<DefaultPage></DefaultPage>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/AddItemList"
            element={
              <Home>
                <Add></Add>
              </Home>
            }
          ></Route>
          <Route
            path="/CartPage"
            element={
              <Home>
                <CartPage></CartPage>
              </Home>
            }
          ></Route>
          <Route
            path="/manageStore"
            element={
              <Home>
                <ManageStore></ManageStore>
              </Home>
            }
          ></Route>

          <Route
            path="/PrintBill"
            element={
              <Home>
                <PrintTheBill></PrintTheBill>
              </Home>
            }
          ></Route>
          <Route
            path="/AllBillsPage"
            element={
              <Home>
                <AllBillsPage></AllBillsPage>
              </Home>
            }
          ></Route>
          
          <Route
            path="/SingleManagerAnalysis/:id"
            element={
              <Home>
                <SingleManagerAnalysis></SingleManagerAnalysis>
              </Home>
            }
          ></Route>
          <Route path="/createStoreManager" element={<Home><CreateManagerByAdmin></CreateManagerByAdmin></Home>}>

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
