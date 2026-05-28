export default function PendingRecords({
  loading,
  error,
  pendingRecords,
  filterSource,
  setFilterSource,
  handleApprove,
  handleReject,
}) {
  return (
    <>
      <div className="records-card__header">
        <span className="records-card__icon">📋</span>
        <select
          value={filterSource}
          onChange={(e) => setFilterSource(e.target.value)}
        >
          <option value="">All</option>
          <option value="SAP">SAP</option>
          <option value="Utility">Utility</option>
          <option value="Travel">Travel</option>
        </select>
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
                <tr
                  key={record.id}
                  className={record.is_suspicious ? "row--suspicious" : ""}
                >
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
    </>
  );
}
