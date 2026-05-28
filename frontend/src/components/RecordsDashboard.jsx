import { approveRecord, rejectRecord } from "../api/api";

export default function RecordsDashboard({
  loading,
  error,
  pendingRecords,
  approvedRecords,
  rejectedRecords,
  setRecords,
}) {
  const handleApprove = async (id) => {
    await approveRecord(id);
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, status: "Approved" } : record,
      ),
    );
  };
  const handleReject = async (id) => {
    await rejectRecord(id);
    setRecords((prev) =>
      prev.map((record) =>
        record.id === id ? { ...record, status: "Rejected" } : record,
      ),
    );
  };
  return (
    <div className="records-card">
      <div className="records-card__header">
        <span className="records-card__icon">📋</span>
        <h2 className="records-card__title">Records Dashboard</h2>
        {pendingRecords && pendingRecords.length > 0 && (
          <span className="records-card__count">
            {pendingRecords.length} records
          </span>
        )}
      </div>
      {loading && <p className="status-msg">Loading...</p>}
      {error && <p className="status-msg status-msg--error">Error: {error}</p>}
      {pendingRecords && (
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
              {pendingRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.source_type}</td>
                  <td>{record.activity_type}</td>
                  <td>{record.quantity}</td>
                  <td>{record.unit}</td>
                  <td>
                    <span className="badge">{record.status}</span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button
                        className="btn-approve"
                        onClick={() => handleApprove(record.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn-reject"
                        onClick={() => handleReject(record.id)}
                      >
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
      <div className="records-card__header">
        <span className="records-card__icon">📋</span>
        <h2 className="records-card__title">Approved Records</h2>
        {approvedRecords && approvedRecords.length > 0 && (
          <span className="records-card__count">
            {approvedRecords.length} records
          </span>
        )}
      </div>
      {loading && <p className="status-msg">Loading...</p>}
      {error && <p className="status-msg status-msg--error">Error: {error}</p>}
      {approvedRecords && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Activity</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {approvedRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.source_type}</td>
                  <td>{record.activity_type}</td>
                  <td>{record.quantity}</td>
                  <td>{record.unit}</td>
                  <td>
                    <span className="badge">{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="records-card__header">
        <span className="records-card__icon">📋</span>
        <h2 className="records-card__title">Rejected Records</h2>
        {rejectedRecords && rejectedRecords.length > 0 && (
          <span className="records-card__count">
            {rejectedRecords.length} records
          </span>
        )}
      </div>
      {loading && <p className="status-msg">Loading...</p>}
      {error && <p className="status-msg status-msg--error">Error: {error}</p>}
      {rejectedRecords && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Activity</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {rejectedRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.source_type}</td>
                  <td>{record.activity_type}</td>
                  <td>{record.quantity}</td>
                  <td>{record.unit}</td>
                  <td>
                    <span className="badge">{record.status}</span>
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
