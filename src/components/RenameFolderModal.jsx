import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useFolder } from "../context/FolderContext";

const RenameFolderModal = ({ show, onHide }) => {
  const { currentFolderId, fetchFolderContents } = useFolder();
  const [newFolderName, setNewFolderName] = useState("");

  const handleRenameFolder = async () => {
    try {
      // Validate new folder name (add additional validation as needed)
      if (!newFolderName.trim()) {
        toast.error("Folder name cannot be empty");
        return;
      }

      // Make API call to rename the folder
      await axios.patch(
        `${import.meta.env.VITE_API_URL}folder/${currentFolderId}`,
        { newFolderName },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Folder renamed successfully");
      fetchFolderContents(currentFolderId);
      // Close the modal
      onHide();
    } catch (error) {
      console.error("Error renaming folder:", error);
      toast.error("Error renaming folder. Please try again later.");
    }
  };

  return (
    <div
      className={`modal ${show ? "d-block" : "d-none"}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Rename Folder</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <div className="d-flex align-items-center justify-content-center flex-column">
                <i
                  className="bx bxs-folder text-warning"
                  style={{ fontSize: "5rem" }}
                ></i>
                <small>{newFolderName}</small>
              </div>
              <input
                type="text"
                id="newFolderName"
                className="form-control"
                value={newFolderName}
                placeholder="Enter new folder name"
                autoFocus
                onChange={(e) => setNewFolderName(e.target.value)}
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
              onClick={handleRenameFolder}
            >
              Rename
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenameFolderModal;
