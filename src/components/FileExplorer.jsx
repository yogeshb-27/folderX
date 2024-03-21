import React, { useState } from "react";

import CreateFolderModal from "./CreateFolderModal";

const FileExplorer = ({ contents, fetchFolderContents, currentFolderId }) => {
  const { folders, files } = contents;

  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);

  const handleCreateFolderClick = () => {
    setShowCreateFolderModal(true);
  };
  return (
    <div className="col-lg-9">
      <div className="container">
        <nav className=" d-flex justify-content-center align-items-center px-2 px-lg-4">
          <ul className="nav mt-3 flex-column flex-sm-row">
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

        {folders?.length === 0 && files?.length === 0 && (
          <p className="text-center mt-5 pt-5 h-100">
            Start adding files and folders to fill this space.
          </p>
        )}
        <ul>
          {folders?.map((folder, index) => (
            <li key={index}>{folder.name}</li>
          ))}
        </ul>
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
    </div>
  );
};

export default FileExplorer;
