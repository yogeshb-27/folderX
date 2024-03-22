import React, { useState } from "react";

import CreateFolderModal from "./CreateFolderModal";
import UploadFileModal from "./UploadFileModal";

const FileExplorer = ({
  contents,
  fetchFolderContents,
  currentFolderId,
  folderStack,
  onBackButtonClick,
}) => {
  const { folders, files, folderName } = contents;

  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);

  const handleCreateFolderClick = () => {
    setShowCreateFolderModal(true);
  };
  const handleUploadFileClick = () => {
    setShowUploadFileModal(true);
  };
  const handleFolderClick = (folderId) => {
    fetchFolderContents(folderId);
  };
  return (
    <div className="col-lg-9">
      <div className="container">
        <nav className=" d-flex justify-content-center align-items-center px-2 px-lg-4">
          <ul className="nav mt-3 flex-column flex-sm-row">
            <li className="nav-item my-2">
              <button
                className="nav-link d-block"
                onClick={handleUploadFileClick}
              >
                <i className="bx bx-cloud-upload"></i> Upload Files
              </button>
            </li>
            <li className="nav-item my-2">
              <button
                className="nav-link d-block"
                onClick={handleCreateFolderClick}
              >
                <i className="bx bx-folder"></i> Create Folder
              </button>
            </li>
          </ul>
        </nav>

        {folderStack?.length >= 2 && (
          <div className="mt-3 d-flex align-items-center justify-content-between">
            <h2 className="fs-5 text-capitalize ms-4">
              <i className="bx bxs-folder-open text-warning"></i> {folderName}
            </h2>

            <button
              className="btn btn-link text-decoration-none text-dark "
              onClick={onBackButtonClick}
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
        {folders?.length > 0 ? (
          <div className="m-3 p-3 bg-body-secondary rounded ">
            <div className="row mt-lg-3">
              {folders?.map((folder) => (
                <div
                  key={folder._id}
                  onClick={() => handleFolderClick(folder._id)}
                  className="col-12 col-sm-6 col-md-4 col-lg-3 folder"
                >
                  <i className="bx bxs-folder text-warning"></i>
                  <p className="text-center text-capitalize">{folder.name}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        <ul>
          {files?.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>

      <CreateFolderModal
        show={showCreateFolderModal}
        onHide={() => setShowCreateFolderModal(false)}
        parentFolderId={currentFolderId}
        fetchFolderContents={fetchFolderContents}
      />

      <UploadFileModal
        show={showUploadFileModal}
        onHide={() => setShowUploadFileModal(false)}
        parentFolderId={currentFolderId}
        fetchFolderContents={fetchFolderContents}
      />
    </div>
  );
};

export default FileExplorer;
