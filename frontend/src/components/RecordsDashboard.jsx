import { approveRecord, rejectRecord } from "../api/api";
import PendingRecords from "./PendingRecords";
import ApprovedRecords from "./ApprovedRecords";
import RejectedRecords from "./RejectedRecords";

export default function RecordsDashboard({
  loading,
  error,
  pendingRecords,
  approvedRecords,
  rejectedRecords,
  setRecords,
  filterSource,
  setFilterSource,
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
      <PendingRecords
        loading={loading}
        error={error}
        pendingRecords={pendingRecords}
        filterSource={filterSource}
        setFilterSource={setFilterSource}
        handleApprove={handleApprove}
        handleReject={handleReject}
      />
      <ApprovedRecords
        loading={loading}
        error={error}
        approvedRecords={approvedRecords}
      />
      <RejectedRecords
        loading={loading}
        error={error}
        rejectedRecords={rejectedRecords}
      />
    </div>
  );
}
