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
    <div className="records-card">
      <div className="records-card__header">
        <span className="records-card__icon">📋</span>
        <h2 className="records-card__title">Records Dashboard</h2>
        {records && records.length > 0 && (
          <span className="records-card__count">{records.length} records</span>
        )}
      </div>
      {loading && <p className="status-msg">Loading...</p>}
      {error && <p className="status-msg status-msg--error">Error: {error}</p>}
      {records && (
        <div className="table-wrap">
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
                  <td><span className="badge">{record.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-approve" onClick={() => handleApprove(record.id)}>
                        Approve
                      </button>
                      <button className="btn-reject" onClick={() => handleReject(record.id)}>
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
