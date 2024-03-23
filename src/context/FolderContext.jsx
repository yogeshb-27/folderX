import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [contents, setContents] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [folderStack, setFolderStack] = useState([]);
  const [storageStats, setStorageStats] = useState({
    total: { size: 0, count: 0 },
    images: { size: 0, count: 0 },
    videos: { size: 0, count: 0 },
    docs: { size: 0, count: 0 },
    other: { size: 0, count: 0 },
  });

  useEffect(() => {
    fetchFolderContents("root");
    fetchUsedStorage();
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
      if (!folderStack.includes(currentFolderId)) {
        await setFolderStack((prevStack) => [...prevStack, currentFolderId]);
      }
      setCurrentFolderId(currentFolderId);
      setContents(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleBackButtonClick = () => {
    if (folderStack.length > 0) {
      folderStack.pop();
      const lastFolderId = folderStack.pop();
      fetchFolderContents(lastFolderId);
    }
  };

  const fetchUsedStorage = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}auth/stats`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.storageStats !== null) {
        setStorageStats(response.data.storageStats);
      }
    } catch (error) {
      console.error("Error calculating used storage:", error);
    }
  };

  return (
    <FolderContext.Provider
      value={{
        currentFolderId,
        folderStack,
        loading,
        contents,
        storageStats,
        fetchUsedStorage,
        handleBackButtonClick,
        fetchFolderContents,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolder = () => {
  return useContext(FolderContext);
};
