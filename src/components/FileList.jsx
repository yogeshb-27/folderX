import React, { useState } from "react";
import axios from "axios";
import { useFolder } from "../context/FolderContext";
import toast from "react-hot-toast";
import RenameFileModal from "./RenameFileModal";
import { useNavigate } from "react-router-dom";
import {
  getFileIcon,
  formatFileSize,
  textFileTypes,
  imageFileTypes,
  videoFileTypes,
  audioFileTypes,
  truncateFileName,
} from "../Utils/FileUtils";

const FileList = () => {
  const navigate = useNavigate();
  const { contents, currentFolderId, fetchFolderContents, fetchUsedStorage } =
    useFolder();
  const { files } = contents;
  const [showRenameFileModal, setShowRenameFileModal] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState(null);

  const handleRenameFileClick = (fileId) => {
    setSelectedFileId(fileId);
    setShowRenameFileModal(true);
  };

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
      fetchFolderContents(currentFolderId);
      fetchUsedStorage();
    } catch (error) {
      toast.error("Error deleting file");
      console.error(error);
    }
  };

  const handleDownloadFileClick = async (fileId, fileName) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}file/download/${fileId}`,
        {
          responseType: "blob",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", fileName);
      link.click();
      toast.success("File downloaded successfully");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Error downloading file. Please try again later.");
    }
  };

  const previewFileSupported = [
    ...textFileTypes,
    ...videoFileTypes,
    ...imageFileTypes,
    ...audioFileTypes,
  ];
  const handleFileClick = (fileId, fileType) => {
    previewFileSupported.includes(fileType)
      ? navigate(`/file-preview/${fileId}`)
      : toast.error("File Preview Not Available");
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
                className="cursor-pointer file-name"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                tabIndex={0}
                title={`${file.name}`}
                onClick={() => handleFileClick(file._id, file.type)}
              >
                {getFileIcon(file.type)} {truncateFileName(file.name, 20)}
              </td>
              <td>{file.type}</td>
              <td>{formatFileSize(file.size)}</td>
              <td>
                <div className="d-block">
                  <i
                    className="bx bx-rename text-muted cursor-pointer me-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Rename File"
                    tabIndex={0}
                    onClick={() => handleRenameFileClick(file._id)}
                  ></i>
                  <i
                    className="bx bx-trash-alt text-danger cursor-pointer me-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete File"
                    tabIndex={0}
                    onClick={() => handleDeleteFileClick(file._id)}
                  ></i>
                  <i
                    className="bx bx-download text-muted cursor-pointer"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Download File"
                    tabIndex={0}
                    onClick={() => handleDownloadFileClick(file._id, file.name)}
                  ></i>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Rename File Modal */}
      {selectedFileId !== null && (
        <RenameFileModal
          show={showRenameFileModal}
          onHide={() => setShowRenameFileModal(false)}
          folderId={currentFolderId}
          fileId={selectedFileId}
          fetchFolderContents={fetchFolderContents}
        />
      )}
    </div>
  );
};

export default FileList;
