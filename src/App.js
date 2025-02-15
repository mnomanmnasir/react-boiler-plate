import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/AddProduct";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap CSS

function App() {
  return (
    <AuthProvider> {/* Wrap Everything Inside AuthProvider */}
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
