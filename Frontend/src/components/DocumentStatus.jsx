import {
  FileText,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";

function DocumentStatus({
  documentInfo,
  documents = [],
  uploadMode,
  onDelete,
}) {
  const isUploaded = !!documentInfo;
  const status = documentInfo?.status || "waiting";

  // =========================
  // WORKSPACE MODE
  // =========================

  if (uploadMode === "workspace") {
    return (
      <div>
        <h2
          className="text-[16px] font-semibold mb-3 transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          Workspace
        </h2>

        <div
          className="rounded-2xl shadow-sm p-4 border transition-colors duration-300"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between">
            <p
              className="text-[14px] font-semibold"
              style={{ color: "var(--text)" }}
            >
              📚 Workspace ({documents.length})
            </p>

            <span className="bg-green-100 text-green-700 text-[11px] px-3 py-1 rounded-full font-medium">
              Ready
            </span>
          </div>

          <div className="mt-4 max-h-40 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
            {documents.length === 0 ? (
              <p
                className="text-[12px]"
                style={{ color: "var(--subtext)" }}
              >
                No documents uploaded.
              </p>
            ) : (
              documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between rounded-xl border px-3 py-2 transition-colors duration-300"
                  style={{
                    background: "var(--bg)",
                    borderColor: "var(--border)",
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText
                      size={15}
                      style={{ color: "var(--primary)" }}
                    />

                    <span
                      className="truncate text-[11px]"
                      style={{ color: "var(--text)" }}
                    >
                      {doc.name}
                    </span>
                  </div>

                  <button
                    onClick={() => onDelete(doc)}
                    className="rounded-full p-1 transition"
                    title="Remove document"
                    style={{ color: "var(--subtext)" }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // SINGLE MODE
  // =========================

  return (
    <div>
      <h2
        className="text-[16px] font-semibold mb-3 transition-colors duration-300"
        style={{ color: "var(--text)" }}
      >
        Document Status
      </h2>

      <div
        className="rounded-2xl shadow-sm p-4 border transition-colors duration-300"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: "var(--primary)",
            }}
          >
            <FileText size={20} className="text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="text-[13px] font-semibold truncate"
              style={{ color: "var(--text)" }}
            >
              {documentInfo?.name || "No document uploaded"}
            </p>

            <p
              className="text-[12px] mt-1"
              style={{ color: "var(--subtext)" }}
            >
              {isUploaded
                ? "Current knowledge source"
                : "Upload a PDF to begin chatting"}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          {status === "processing" ? (
            <>
              <Loader2
                size={15}
                className="animate-spin text-amber-500"
              />
              <span className="bg-yellow-100 text-yellow-700 text-[11px] px-3 py-1 rounded-full font-medium">
                Processing
              </span>
            </>
          ) : status === "failed" ? (
            <>
              <CheckCircle2 size={15} className="text-red-500" />
              <span className="bg-red-100 text-red-600 text-[11px] px-3 py-1 rounded-full font-medium">
                Upload Failed
              </span>
            </>
          ) : isUploaded ? (
            <>
              <CheckCircle2 size={15} className="text-green-600" />
              <span className="bg-green-100 text-green-700 text-[11px] px-3 py-1 rounded-full font-medium">
                Ready to Chat
              </span>
            </>
          ) : (
            <>
              <CheckCircle2
                size={15}
                style={{ color: "var(--subtext)" }}
              />
              <span className="bg-gray-100 text-gray-500 text-[11px] px-3 py-1 rounded-full font-medium">
                Waiting for Upload
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DocumentStatus;