import { useState } from "react";
import { uploadFile } from "../api/api";

export default function UploadFile({ fetchRecords, source, setSource }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    await uploadFile(file, source);
    await fetchRecords();
  };

  return (
    <div className="upload-card">
      <div className="upload-card__header">
        <span className="upload-card__icon">📤</span>
        <h2 className="upload-card__title">Upload Data File</h2>
      </div>
      <div className="upload-card__controls">
        <div className="form-group">
          <label className="form-label" htmlFor="source-select">Source Type</label>
          <select id="source-select" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="sap">SAP</option>
            <option value="utility">Utility</option>
            <option value="travel">Travel</option>
          </select>
        </div>
        <div className="form-group form-group--grow">
          <label className="form-label">File</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="form-group form-group--action">
          <button className="btn-upload" onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
}
