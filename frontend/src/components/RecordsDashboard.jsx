import { approveRecord, rejectRecord } from "../api/api";

export default function RecordsDashboard({
  loading,
  error,
  records,
  fetchRecords,
}) {
  const handleApprove = async (id) => {
    await approveRecord(id);
    await fetchRecords();
  };
  const handleReject = async (id) => {
    await rejectRecord(id);
    await fetchRecords();
  };
  return (
    <>
      <h1>Records Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {records && (
        <table>
          <thead>
            <tr>
              <th>Source</th>
              <th>Activity</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.source_type}</td>
                <td>{record.activity_type}</td>
                <td>{record.quantity}</td>
                <td>{record.unit}</td>
                <td>{record.status}</td>
                <td>
                  <button onClick={() => handleApprove(record.id)}>
                    Approve
                  </button>
                  <button onClick={() => handleReject(record.id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
