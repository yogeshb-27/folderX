import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { formatFileSize } from "../Utils/FileUtils";
import { useFolder } from "../context/FolderContext";

const UploadFileModal = ({ show, onHide }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { currentFolderId, fetchFolderContents, fetchUsedStorage } =
    useFolder();

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];

    if (selectedFile) {
      if (selectedFile.size <= 15 * 1024 * 1024) {
        setFile(selectedFile);
      } else {
        toast.error("File size exceeds the limit (15 MB)");
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const config = {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        };

        await axios.post(
          `${import.meta.env.VITE_API_URL}file/${currentFolderId}`,
          formData,
          config
        );
        setFile(null);
        setUploadProgress(0);
        toast.success("File uploaded successfully");
        onHide();
        fetchFolderContents(currentFolderId);
        fetchUsedStorage();
      } catch (error) {
        toast.error(error.response.data.error);
        setFile(null);
        setUploadProgress(0);
        console.error(error);
      }
    }
  };

  return (
    <div
      className={`modal ${show ? "d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Upload File</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body file-upload d-flex align-items-center justify-content-center flex-column">
            <div
              {...getRootProps()}
              className={`dropzone ${isDragActive ? "border-info" : ""}`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here...</p>
              ) : (
                <p>
                  <i className="bx bx-cloud-upload fs-3 d-block"></i>
                  Drag 'n' drop a file here,
                  <br /> or <br />
                  Browse File
                </p>
              )}
            </div>
            {file && (
              <div className="mt-3">
                <p className="mb-1">{file.name}</p>
                <p className="mb-1">Size: {formatFileSize(file.size)}</p>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${uploadProgress}%` }}
                    aria-valuenow={uploadProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    {uploadProgress}%
                  </div>
                </div>
              </div>
            )}
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
              onClick={handleUpload}
              disabled={!file}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFileModal;
