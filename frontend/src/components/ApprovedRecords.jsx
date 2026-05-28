export default function ApprovedRecords({ loading, error, approvedRecords }) {
  return (
    <>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
