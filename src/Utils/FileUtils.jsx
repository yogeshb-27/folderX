export const formatFileSize = (sizeInBytes) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " B";
  } else if (sizeInBytes < 1024 * 1024) {
    return (sizeInBytes / 1024).toFixed(2) + " KB";
  } else {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
  }
};

export const truncateFileName = (name, maxLength) => {
  if (name.length <= maxLength) {
    return name;
  }
  return name.substring(0, maxLength - 3) + "...";
};

export const getFileIcon = (fileType) => {
  switch (fileType) {
    case "pdf":
      return <i className="bx bxs-file-pdf text-danger"></i>;
    case "md":
      return <i className="bx bxs-file-md text-secondary"></i>;
    case "doc":
    case "docx":
      return <i className="bx bxs-file-doc text-primary"></i>;
    case "html":
      return <i className="bx bxl-html5 text-danger"></i>;
    case "css":
      return <i className="bx bxl-css3 text-primary"></i>;
    case "js":
    case "cjs":
    case "mjs":
      return <i className="bx bxl-javascript text-warning"></i>;
    case "ts":
      return <i className="bx bxl-typescript text-primary"></i>;
    case "php":
      return <i className="bx bxl-php text-primary-emphasis"></i>;
    case "java":
    case "jsp":
      return <i className="bx bxl-java text-danger"></i>;
    case "jsx":
    case "tsx":
      return <i className="bx bxl-react text-info"></i>;
    case "py":
      return <i className="bx bxl-python text-warning"></i>;
    case "cpp":
    case "c":
      return <i className="bx bxl-c-plus-plus text-primary-emphasis"></i>;
    case "go":
      return <i className="bx bxl-go-lang text-info"></i>;
    case "git":
    case "gitignore":
      return <i className="bx bxl-git text-danger"></i>;
    case "db":
    case "sql":
      return <i className="bx bx-data text-success"></i>;
    case "json":
      return <i className="bx bx-code-curly text-dark"></i>;
    case "image":
    case "svg":
    case "png":
    case "gif":
    case "jpeg":
    case "jpg":
    case "webp":
    case "heic":
    case "ico":
      return <i className="bx bx-image text-success"></i>;
    case "text":
      return <i className="bx bxs-file-txt text-secondary"></i>;
    case "mp4":
      return <i className="bx bx-movie-play text-dark"></i>;
    case "mp3":
      return <i className="bx bxl-tiktok text-dark"></i>;
    case "zip":
    case "jar":
      return <i className="bx bxs-file-archive text-warning"></i>;
    case "xlxs":
    case "xlx":
      return <i className="bx bxs-spreadsheet text-success"></i>;
    case "bat":
    case "exe":
      return <i className="bx bxl-windows text-info"></i>;
    case "app":
      return <i className="bx bxl-apple text-dark"></i>;
    default:
      return <i className="bx bx-file-blank "></i>;
  }
};

export const textFileTypes = [
  "txt",
  "md",
  "html",
  "css",
  "js",
  "ts",
  "json",
  "xml",
  "log",
  "csv",
  "sql",
  "php",
  "py",
  "java",
  "c",
  "r",
  "cs",
  "go",
  "cmd",
  "cpp",
  "h",
  "rb",
  "sh",
  "jsx",
  "conf",
  "tsx",
  "gitignore",
  "svg",
  "ejs",
  "env",
];
export const languageMap = {
  txt: "plaintext",
  md: "markdown",
  html: "html",
  css: "css",
  js: "javascript",
  ts: "typescript",
  json: "json",
  xml: "xml",
  log: "plaintext",
  csv: "plaintext",
  sql: "sql",
  php: "php",
  py: "python",
  java: "java",
  c: "c",
  r: "r",
  cs: "csharp",
  go: "go",
  cmd: "plaintext",
  env: "plaintext",
  cpp: "cpp",
  h: "cpp",
  rb: "ruby",
  sh: "bash",
  jsx: "jsx",
  conf: "plaintext",
  tsx: "typescript",
  gitignore: "plaintext",
  svg: "xml",
  ejs: "ejs",
};

export const audioFileTypes = ["mp3", "wav", "ogg", "aac", "flac"];

export const videoFileTypes = ["mp4", "avi", "mkv", "mov", "wmv"];

export const imageFileTypes = [
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "png",
  "ico",
  "svg",
];
