import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const RenameFileModal = ({
  show,
  onHide,
  folderId,
  fileId,
  fetchFolderContents,
}) => {
  const [newFileName, setNewFileName] = useState("");

  const handleRenameFile = async () => {
    try {
      if (!newFileName.trim()) {
        toast.error("Folder name cannot be empty");
        return;
      }

      await axios.patch(
        `${import.meta.env.VITE_API_URL}file/${fileId}`,
        { newFileName },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("File renamed successfully");
      fetchFolderContents(folderId);
      onHide();
    } catch (error) {
      console.error("Error renaming file:", error);
      toast.error("Error renaming file. Please try again later.");
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
            <label htmlFor="newFolderName" className="form-label">
              New File Name:
            </label>
            <input
              type="text"
              id="newFolderName"
              className="form-control"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
            />
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
              onClick={handleRenameFile}
            >
              Rename
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenameFileModal;
