export default function RecordsDashboard({ loading, error, records }) {
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
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.source_type}</td>
                <td>{record.activity_type}</td>
                <td>{record.quantity}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
