import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppNavBar from "./components/AppNavBar";
import Login from "./pages/Login"
import ProductDetails from "./pages/ProductDetails"
import Purchases from "./pages/Purchases"
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import ProtectedRoute from "./components/ProtectedRoute";
//logic
function App() {

  const isLoading = useSelector(  state =>state.isLoading)


  return (
    <HashRouter>
       { isLoading && <Loader/> }
      <AppNavBar/>
      <Container fluid>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route
        element ={<Login/>}
        path="/login"
        />
        <Route
        element ={<ProductDetails/>}
        path="/product/:id"
        />
        {/* Ruta Por proteger*/}
        <Route
        element={<ProtectedRoute/>}
        >

        <Route
        element ={<Purchases/>}
        path="/purchases"
        />
        </Route>

      </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
