interface FileUploadProps {
  mode?: string;
  getInputProps?: () => any;
  open?: () => void;
}

interface FileUploadModeOption {
  label: string;
  value: string;
}

interface FileUploadInfo {
  dirName?: string;
  fileCount?: number;
  filePaths?: string[];
}
