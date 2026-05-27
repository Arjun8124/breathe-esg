import { useEffect, useState } from "react";
import { getAllRecords } from "./api/api";
import RecordsDashboard from "./components/RecordsDashboard";
export default function App() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
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
    fetchRecords();
  }, []);

  return (
    <div>
      <RecordsDashboard records={records} loading={loading} error={error} />
    </div>
  );
}
