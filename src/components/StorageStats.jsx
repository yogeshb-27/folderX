import React from "react";
import { formatFileSize } from "../Utils/FileUtils";
import { useFolder } from "../context/FolderContext";
const StorageStats = () => {
  const { storageStats } = useFolder();
  const calculatePercentage = () => {
    const percentage = (storageStats.total.size / 52428800) * 100;
    return percentage.toFixed(2);
  };

  const categories = [
    {
      name: "Images",
      icon: (
        <i className="bx bx-image text-success bg-success-subtle p-1 rounded fs-5"></i>
      ),
      totalFiles: storageStats.images.count,
      totalData: storageStats.images.size,
      color: "success",
    },
    {
      name: "Videos",
      icon: (
        <i className="bx bx-movie-play text-warning bg-warning-subtle p-1 rounded fs-5"></i>
      ),
      totalFiles: storageStats.videos.count,
      totalData: storageStats.videos.size,
      color: "warning",
    },
    {
      name: "Documents",
      icon: (
        <i className="bx bxs-file-doc text-primary bg-primary-subtle p-1 rounded fs-5"></i>
      ),
      totalFiles: storageStats.docs.count,
      totalData: storageStats.docs.size,
      color: "primary",
    },
    {
      name: "Others",
      icon: (
        <i className="bx bx-info-circle text-danger bg-danger-subtle p-1 rounded fs-5"></i>
      ),
      totalFiles: storageStats.other.count,
      totalData: storageStats.other.size,
      color: "danger",
    },
  ];
  return (
    <div className="col-12 col-md-6 offset-md-3 offset-lg-0 col-lg-3">
      <div className="container">
        <div className="progress mt-4" style={{ height: ".75rem" }}>
          {categories.map((category, index) => (
            <div
              key={index}
              className={`progress-bar bg-${category.color}`}
              style={{
                width: `${(category.totalData / 52428800) * 100}% `,
                cursor: "pointer",
              }}
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title={`${category.name}`}
            ></div>
          ))}
        </div>
        <small className="d-block text-muted mt-2">
          Used: {formatFileSize(storageStats.total.size)}(
          {calculatePercentage()}
          %)
        </small>
        <small className="d-block text-muted">
          Free: {formatFileSize(52428800 - storageStats.total.size)}
        </small>
        <div className="category-info mt-4">
          {categories.map((category, index) => (
            <div key={index}>
              <div className="category-item d-flex align-items-center ">
                <span className="me-2"> {category.icon} </span>
                <span className="d-inline-flex flex-column">
                  {category.name}
                  <small style={{ fontSize: ".75rem", color: "#777" }}>
                    {category.totalFiles}{" "}
                    {category.totalFiles > 1 ? "Files" : "File"}
                  </small>
                </span>
                <span className="ms-auto">
                  {formatFileSize(category.totalData)}
                </span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorageStats;
