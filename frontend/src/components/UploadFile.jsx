import { useState } from "react";
import { uploadFile } from "../api/api";

export default function UploadFile({ fetchRecords }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    await uploadFile(file, "sap");
    await fetchRecords();
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
