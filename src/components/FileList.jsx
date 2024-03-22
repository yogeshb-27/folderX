import React from "react";
import { formatFileSize, getFileIcon } from "../Utils/FileUtils";
import { useFolder } from "../context/FolderContext";

const FileList = () => {
  const { contents } = useFolder();
  const { files } = contents;
  return (
    <div className="files p-3 m-3 p-3 bg-body-secondary rounded table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileList;
