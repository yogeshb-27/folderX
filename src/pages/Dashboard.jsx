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
  const [loading, setLoading] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState();
  const [folderStack, setFolderStack] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchFolderContents("root");
  }, []);

  const fetchFolderContents = async (currentFolderId) => {
    try {
      setLoading(true);
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
      if (!folderStack.includes(currentFolderId)) {
        setFolderStack((prevStack) => [...prevStack, currentFolderId]);
      }
      setContents(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackButtonClick = () => {
    if (folderStack.length > 0) {
      folderStack.pop();
      const lastFolderId = folderStack.pop();
      fetchFolderContents(lastFolderId);
    }
  };

  if (loading) {
    return <p className="mt-5 pt-5  text-center">Loading ...</p>;
  }

  return (
    <div className="container mx-auto">
      <div className="row">
        <FileExplorer
          contents={contents}
          folderStack={folderStack}
          onBackButtonClick={handleBackButtonClick}
          fetchFolderContents={fetchFolderContents}
          currentFolderId={currentFolderId}
        />
        <StorageStats />
      </div>
    </div>
  );
};

export default Dashboard;
