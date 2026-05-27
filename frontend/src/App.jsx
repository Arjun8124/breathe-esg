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
    <div>
      <UploadFile
        fetchRecords={fetchRecords}
        source={source}
        setSource={setSource}
      />
      <RecordsDashboard records={records} loading={loading} error={error} />
    </div>
  );
}
