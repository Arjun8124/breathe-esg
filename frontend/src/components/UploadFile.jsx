import { useState } from "react";
import { uploadFile } from "../api/api";

export default function UploadFile({ fetchRecords, source, setSource }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    await uploadFile(file, source);
    await fetchRecords();
  };

  return (
    <div>
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="sap">Sap</option>
        <option value="utility">Utility</option>
        <option value="travel">Travel</option>
      </select>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
