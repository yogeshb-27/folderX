import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";
import {
  textFileTypes,
  videoFileTypes,
  imageFileTypes,
  audioFileTypes,
  formatFileSize,
  getFileIcon,
  languageMap,
} from "../Utils/FileUtils";

const FilePreview = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { fileId } = useParams();
  const [fileDetails, setFileDetails] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchFileDetails();
  }, []);
  const fetchFileDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}file/${fileId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setFileDetails(response.data);
    } catch (error) {
      toast.error("Error fetching file");
      console.error("Error fetching file details:", error);
    }
  };

  if (!fileDetails) {
    return <p className="pt-5 mt-5 text-center">Loading...</p>;
  }

  const getTextContent = (fileContent) => {
    try {
      const decodedContent = atob(fileContent);
      return decodedContent;
    } catch (error) {
      console.error("Error decoding text content:", error);
      return "Error decoding text content";
    }
  };

  const getLanguage = (fileType) => {
    return languageMap[fileType] || "plaintext";
  };

  return (
    <div className="container p-2 mb-5 p-lg-5 d-flex justify-content-center flex-column position-relative  ">
      <button
        className="btn btn-link text-dark text-decoration-none position-absolute top-0 end-0 mt-3"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <p className="text-center mt-5">
        Name : {getFileIcon(fileDetails.type)} {fileDetails.name}
      </p>
      <small className="text-muted text-center mb-4">
        Size: {formatFileSize(fileDetails.size)}
      </small>

      {textFileTypes.includes(fileDetails.type) && (
        <div className="container text-preview">
          <SyntaxHighlighter
            language={getLanguage(fileDetails.type)}
            style={atomDark}
            className="p-3 py-4 ps-lg-5 w-100"
          >
            {getTextContent(fileDetails.content)}
          </SyntaxHighlighter>
        </div>
      )}
      <div
        className="d-block mb-4 mx-auto"
        style={{ maxHeight: "400px", width: "auto" }}
      >
        {imageFileTypes.includes(fileDetails.type) && (
          <img
            src={`data:${fileDetails.type};base64,${fileDetails.content}`}
            alt={`${fileDetails.name}`}
            className="w-100 shadow-lg"
            style={{ height: "auto", maxHeight: "400px", maxWidth: "100%" }}
          />
        )}

        {audioFileTypes.includes(fileDetails.type) && (
          <audio controls>
            <source
              src={`data:${fileDetails.type};base64,${fileDetails.content}`}
              type={`${fileDetails.mimeType}`}
            />
            Your browser does not support the audio tag.
          </audio>
        )}

        {videoFileTypes.includes(fileDetails.type) && (
          <video height="450" className="shadow-lg" controls muted>
            <source
              src={`data:${fileDetails.type};base64,${fileDetails.content}`}
              type={`${fileDetails.mimeType}`}
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default FilePreview;
