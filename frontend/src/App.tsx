import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import About from "./pages/About";
import Resultados from "./pages/Resultados";
import Colabora from "./pages/Colabora";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import "./App.css";
import Register from "./components/Register";
import LogIn from "./pages/LogIn";
import ResetPassword from "./components/ResetPassword";
import Centers from "./pages/Centers";
import SearchResults from "./pages/SearchResults";
import Privacity from "./pages/Privacity";
import Terms from "./pages/Terms";
import CenterDetail from "./pages/CenterDetail";
import AnimalDetail from "./pages/AnimalDetail";

const App: React.FC = () => {
  return (
    <AuthProvider> {/* Envolvemos la aplicación con AuthProvider */}
      <Router>
        <Layout>
          <div className="flex justify-center">
            <div className="w-[1200px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/colabora" element={<Colabora />} />
                <Route path="/resultados" element={<Resultados />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                <Route path="/centers" element={<Centers />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacity" element={<Privacity />} />
                <Route path="/center/:id" element={<CenterDetail />} />
                <Route path="/animal/:id" element={<AnimalDetail />} /> {/* Nueva ruta */}
              </Routes>
            </div>
          </div>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;