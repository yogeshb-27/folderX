import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useFolder } from "../context/FolderContext";

const CreateFolderModal = ({ show, onHide }) => {
  const { currentFolderId, fetchFolderContents } = useFolder();
  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}folder/`,
        { folderName, parentFolderId: currentFolderId },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Folder created successfully");
      setFolderName("");
      onHide();
      fetchFolderContents(currentFolderId);
    } catch (error) {
      toast.error(error.response?.data?.error);
      console.error(error);
    }
  };

  return (
    <div
      className={`modal ${show ? "d-block" : ""} `}
      tabIndex="-1"
      role="dialog"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Folder</h5>

            <button
              type="button"
              className="btn-close"
              onClick={onHide}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <div className="d-flex align-items-center justify-content-center flex-column">
                <i
                  className="bx bxs-folder text-warning"
                  style={{ fontSize: "5rem" }}
                ></i>
                <small>{folderName}</small>
              </div>
              <input
                type="text"
                className="form-control"
                id="folderName"
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreateFolder}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFolderModal;
