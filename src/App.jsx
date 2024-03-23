import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import About from "./pages/About";
import { AuthProvider } from "./context/AuthContext";
import { FolderProvider } from "./context/FolderContext";
import FilePreview from "./pages/FilePreview";
import NotFound from "./pages/NotFound";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <FolderProvider>
          <Toaster />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/file-preview/:fileId" element={<FilePreview />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </FolderProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
