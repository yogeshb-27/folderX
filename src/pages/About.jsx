import React from "react";

const About = () => {
  return (
    <div className="px-3 px-md-5 py-5 mt-5 container mx-auto">
      <h2 className="display-1 fs-3 md:fs-2 text-center mb-5">
        <span className="text-danger">FolderX</span> - File Management System
      </h2>
      <h3 className="fs-5 md:fs-4 display-6">Description:</h3>
      <p>
        FolderX is a cloud-based file management system that provides users with
        50MB of cloud storage, keyboard shortcuts, search options, and
        drag-and-drop file upload functionality. It aims to streamline digital
        workspace organization and management by offering efficient file
        handling features. With FolderX, users can effortlessly manage their
        digital assets and optimize their workflow.
      </p>
      <h3 className="fs-5 md:fs-4 display-6">Features:</h3>
      <ul>
        <li>
          Folder Management: Create, rename, and delete folders for seamless
          organization.
        </li>
        <li>
          File Upload/Download: Effortlessly upload and download files to and
          from the system.
        </li>
        <li>
          Storage Quotas: Set storage limits for users to manage file storage
          effectively.
        </li>
        <li>
          Drag-and-Drop Upload: Intuitive drag-and-drop functionality for easy
          file uploading.
        </li>
        <li>
          Automatic Cleanup: Automatic cleanup of old or unused files to
          optimize storage space.
        </li>
        <li>
          File Preview: Preview common file types such as images, PDFs,
          documents, and more.
        </li>
        <li>
          Responsive Design: Enjoy a seamless experience across various devices.
        </li>
      </ul>
      <h3 className="fs-5 md:fs-4 display-6">Tech Stack:</h3>
      <ul>
        <li>Frontend: React.js for the frontend development.</li>
        <li>Vite: Fast and efficient development environment.</li>
        <li>MongoDB: NoSQL database for data storage.</li>
        <li>React Router: For smooth navigation within the application.</li>
        <li>Bootstrap: CSS framework for responsive design.</li>
        <li>Express and Node.js: Backend API development.</li>
      </ul>
    </div>
  );
};

export default About;
