import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StorageStats from "../components/StorageStats";
import FileExplorer from "../components/FileExplorer";
import { useFolder } from "../context/FolderContext";

const Dashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="container mx-auto">
      <div className="row">
        <FileExplorer />
        <StorageStats />
      </div>
    </div>
  );
};

export default Dashboard;
