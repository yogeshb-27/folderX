import React from "react";

const FileExplorer = ({ contents }) => {
  const { folders, files } = contents;
  return (
    <div className="col-lg-9">
      <div className="container">
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
    </div>
  );
};

export default FileExplorer;
