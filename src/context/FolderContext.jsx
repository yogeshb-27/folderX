import { createContext, useContext, useState } from "react";
import axios from "axios";

const FolderContext = createContext();

export const FolderProvider = ({ children }) => {
  const [contents, setContents] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState();
  const [folderStack, setFolderStack] = useState([]);

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

  return (
    <FolderContext.Provider
      value={{
        currentFolderId,
        folderStack,
        loading,
        contents,
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
