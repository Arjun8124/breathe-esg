import { useEffect, useState } from "react";
import { getAllRecords } from "./api/api";
import RecordsDashboard from "./components/RecordsDashboard";
import UploadFile from "./components/UploadFile";
export default function App() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState("sap");

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await getAllRecords();
      setRecords(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchRecords();
    };
    load();
  }, []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__logo">B</span>
          <div>
            <h1 className="app-header__title">Breathe ESG</h1>
            <p className="app-header__subtitle">Data Normalization Console</p>
          </div>
        </div>
      </header>
      <UploadFile
        fetchRecords={fetchRecords}
        source={source}
        setSource={setSource}
      />
      <RecordsDashboard
        records={records}
        loading={loading}
        error={error}
        fetchRecords={fetchRecords}
      />
    </div>
  );
}
