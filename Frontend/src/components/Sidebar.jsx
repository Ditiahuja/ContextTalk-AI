import logo from "../assets/logo.png";
import UploadCard from "./UploadCard";
import DocumentStatus from "./DocumentStatus";

function Sidebar({
  onUpload,
  documentInfo,
  documents,
  uploadMode,
  setUploadMode,
  onDelete,
}) {
  return (
    <aside
      className="w-75 h-full rounded-[28px] border shadow-sm p-5 flex flex-col transition-colors duration-300"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Logo */}

      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
          style={{ background: "var(--primary)" }}
        >
          <img
            src={logo}
            alt="ContextTalk AI"
            className="w-8 h-8 object-contain"
          />
        </div>

        <div>
          <h1
            className="text-[22px] font-semibold tracking-tight transition-colors duration-300"
            style={{ color: "var(--text)" }}
          >
            ContextTalk AI
          </h1>

          <p
            className="mt-1 text-[14px] leading-6 transition-colors duration-300"
            style={{ color: "var(--subtext)" }}
          >
            Intelligent conversations
            <br />
            with your documents.
          </p>
        </div>
      </div>

      {/* Upload Mode */}

      <div className="mt-5">
        <h2
          className="text-[15px] font-semibold mb-3 transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          Knowledge Base
        </h2>

        <div
          className="flex rounded-xl p-1 transition-colors duration-300"
          style={{ background: "var(--bg)" }}
        >
          <button
            onClick={() => setUploadMode("single")}
            className={`flex-1 rounded-lg py-2 text-[12px] font-medium transition-all duration-300 ${
              uploadMode === "single"
                ? "text-white shadow-sm"
                : ""
            }`}
            style={{
              background:
                uploadMode === "single" ? "var(--primary)" : "transparent",
              color:
                uploadMode === "single"
                  ? "#fff"
                  : "var(--subtext)",
            }}
          >
            Single
          </button>

          <button
            onClick={() => setUploadMode("workspace")}
            className="flex-1 rounded-lg py-2 text-[12px] font-medium transition-all duration-300"
            style={{
              background:
                uploadMode === "workspace"
                  ? "var(--primary)"
                  : "transparent",
              color:
                uploadMode === "workspace"
                  ? "#fff"
                  : "var(--subtext)",
            }}
          >
            Workspace
          </button>
        </div>
      </div>

      {/* Upload */}

      <div className="mt-5">
        <UploadCard
          onUpload={onUpload}
          uploadMode={uploadMode}
          setUploadMode={setUploadMode}
        />
      </div>

      {/* Document Status */}

      <div className="mt-4">
        <DocumentStatus
          documentInfo={documentInfo}
          documents={documents}
          uploadMode={uploadMode}
          onDelete={onDelete}
        />
      </div>
    </aside>
  );
}

export default Sidebar;