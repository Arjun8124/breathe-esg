import { useEffect, useState } from "react";
import { getAllRecords } from "./api/api";
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
      <h1>Records Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {records.map((record) => (
        <div key={record.id}>{record.activity_type}</div>
      ))}
    </div>
  );
}
