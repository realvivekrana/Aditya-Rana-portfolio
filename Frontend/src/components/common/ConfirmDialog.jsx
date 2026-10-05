import Modal from "./Modal";

const ConfirmDialog = ({
  open,
  title = "Are you sure?",
  message,
  confirmText = "Delete",
  loading = false,
  onConfirm,
  onClose,
}) => (
  <Modal open={open} onClose={onClose} title={title} size="md">
    <p className="text-slate-600">{message}</p>
    <div className="mt-6 flex justify-end gap-3">
      <button type="button" onClick={onClose} className="btn-admin-ghost">
        Cancel
      </button>
      <button type="button" onClick={onConfirm} disabled={loading} className="btn-danger">
        {loading ? "Please wait..." : confirmText}
      </button>
    </div>
  </Modal>
);

export default ConfirmDialog;