import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StorageStats from "../components/StorageStats";
import FileExplorer from "../components/FileExplorer";

const Dashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [contents, setContents] = useState({});
  const [currentFolderId, setCurrentFolderId] = useState("root");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchFolderContents(currentFolderId);
  }, []);

  const fetchFolderContents = async (currentFolderId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}folder/${currentFolderId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCurrentFolderId(currentFolderId);
      setContents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="row">
        <FileExplorer contents={contents} />
        <StorageStats />
      </div>
    </div>
  );
};

export default Dashboard;
