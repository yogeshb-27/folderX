import React from "react";
import { formatFileSize } from "../Utils/FileUtils";
import { useFolder } from "../context/FolderContext";

const FileList = () => {
  const { contents } = useFolder();
  const { files } = contents;
  return (
    <div className="files m-3 p-3 bg-white rounded my-4 table-responsive">
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
                {file.type} {file.name}
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
