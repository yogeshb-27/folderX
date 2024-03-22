import React from "react";
import axios from "axios";
import { formatFileSize, getFileIcon } from "../Utils/FileUtils";
import { useFolder } from "../context/FolderContext";
import toast from "react-hot-toast";

const FileList = () => {
  const { contents, currentFolderId, fetchFolderContents } = useFolder();
  const { files } = contents;

  const handleDeleteFileClick = async (fileId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}file/${fileId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: { folderId: currentFolderId },
        }
      );
      toast.success(response.data.message);
      fetchFolderContents(currentFolderId); // Refresh folder contents after successful file deletion
    } catch (error) {
      toast.error("Error deleting file");
      console.error(error);
    }
  };

  return (
    <div className="files p-3 m-3 p-3 bg-body-secondary rounded table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td
                className="cursor-pointer file-icon"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                tabIndex={0}
                title={`${file.name}`}
              >
                {getFileIcon(file.type)} {file.name}
              </td>
              <td>{file.type}</td>
              <td>{formatFileSize(file.size)}</td>
              <td>
                <i
                  className="bx bx-trash-alt text-danger cursor-pointer me-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Delete File"
                  tabIndex={0}
                  onClick={() => handleDeleteFileClick(file._id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
