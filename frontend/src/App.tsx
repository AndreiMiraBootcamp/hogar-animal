import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import About from "./pages/info/About";
import Resultados from "./pages/search/Resultados";
import Colabora from "./pages/info/Colabora";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Profile from "./pages/profile/Profile";
import "./App.css";
import Register from "./components/layout/Register";
import LogIn from "./pages/profile/LogIn";
import ResetPassword from "./components/others/ResetPassword";
import Centers from "./pages/Centers";
import SearchResults from "./pages/search/SearchResults";
import Privacity from "./pages/info/Privacity";
import Terms from "./pages/info/Terms";
import CenterDetail from "./pages/CenterDetail";
import AnimalDetail from "./pages/AnimalDetail";
import ScrollUpButton from "./components/others/ScrollUpButton";

const App: React.FC = () => {
  return (
    <AuthProvider> 
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
                <Route path="/scrollupbutton" element={<ScrollUpButton />} />
                <Route path="/center/:id" element={<CenterDetail />} />
                <Route path="/animal/:id" element={
                  <>
                    <AnimalDetail />
                    <CenterDetail />
                  </>
                } />              
                </Routes>
            </div>
          </div>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;