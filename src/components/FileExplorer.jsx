import React, { useState } from "react";
import CreateFolderModal from "./CreateFolderModal";
import UploadFileModal from "./UploadFileModal";
import { useFolder } from "../context/FolderContext";
import RenameFolderModal from "./RenameFolderModal";
import FileList from "./FileList";
import toast from "react-hot-toast";
import axios from "axios";

const FileExplorer = () => {
  const {
    loading,
    contents,
    folderStack,
    fetchFolderContents,
    handleBackButtonClick,
    currentFolderId,
    fetchUsedStorage,
  } = useFolder();
  const { folders, files, folderName } = contents;

  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showRenameFolderModal, setShowRenameFolderModal] = useState(false);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);

  const handleDeleteFolderClick = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}folder/${currentFolderId}`,
        {
          data: { parentFolderId: folderStack[folderStack.length - 1] },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);
      fetchUsedStorage();
      handleBackButtonClick();
    } catch (error) {
      toast.error("Error deleting folder");
      console.error(error);
    }
  };

  return (
    <div className="col-lg-9 mb-5 pb-5">
      {loading ? (
        <p className=" col-lg-9 mt-5 pt-5  text-center">Loading ...</p>
      ) : (
        <>
          <div className="container">
            <nav className=" d-flex justify-content-center align-items-center px-2 px-lg-4">
              <ul className="nav mt-3 flex-column flex-sm-row">
                <li className="nav-item my-2">
                  <button
                    className="nav-link d-block"
                    onClick={() => setShowUploadFileModal(true)}
                  >
                    <i className="bx bx-cloud-upload"></i> Upload Files
                  </button>
                </li>
                <li className="nav-item my-2">
                  <button
                    className="nav-link d-block"
                    onClick={() => setShowCreateFolderModal(true)}
                  >
                    <i className="bx bx-folder"></i> Create Folder
                  </button>
                </li>
              </ul>
            </nav>

            {folderStack?.length >= 2 && (
              <div className="mt-3 d-flex align-items-center justify-content-between">
                <h2 className="fs-5 text-capitalize ms-4">
                  <i className="bx bxs-folder-open text-warning"></i>{" "}
                  {folderName}
                </h2>
                <div>
                  <i
                    className="bx bx-rename text-muted cursor-pointer me-3"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Rename Folder"
                    onClick={() => setShowRenameFolderModal(true)}
                    tabIndex={0}
                  ></i>
                  <i
                    className="bx bx-trash text-danger cursor-pointer me-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Delete Folder"
                    tabIndex={0}
                    onClick={handleDeleteFolderClick}
                  ></i>
                </div>
                <button
                  className="btn btn-link text-decoration-none text-dark "
                  onClick={handleBackButtonClick}
                  tabIndex={0}
                >
                  Back
                </button>
              </div>
            )}
            {folders?.length === 0 && files?.length === 0 && (
              <p className="text-center mt-5 pt-5 h-100">
                Start adding files and folders to fill this space.
              </p>
            )}

            {/* folders */}
            {folders?.length > 0 && (
              <div className="m-3 p-3 bg-body-secondary rounded ">
                <div className="row mt-lg-3">
                  {folders?.map((folder) => (
                    <div
                      key={folder._id}
                      onClick={() => fetchFolderContents(folder._id)}
                      className="col-12 col-sm-6 col-md-4 col-lg-3 folder"
                    >
                      <i className="bx bxs-folder text-warning"></i>
                      <p className="text-center text-capitalize">
                        {folder.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {files?.length > 0 && <FileList />}
          </div>

          <CreateFolderModal
            show={showCreateFolderModal}
            onHide={() => setShowCreateFolderModal(false)}
          />
          <RenameFolderModal
            show={showRenameFolderModal}
            onHide={() => setShowRenameFolderModal(false)}
          />
          <UploadFileModal
            show={showUploadFileModal}
            onHide={() => setShowUploadFileModal(false)}
          />
        </>
      )}
    </div>
  );
};

export default FileExplorer;
