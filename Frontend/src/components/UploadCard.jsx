import { useRef } from "react";
import { UploadCloud } from "lucide-react";

function UploadCard({ onUpload, uploadMode }) {
  const fileInputRef = useRef(null);

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    console.log("📄 Selected File:", file);
    console.log("📚 Upload Mode:", uploadMode);

    if (onUpload) {
      await onUpload(file, uploadMode);
    }

    e.target.value = "";
  };

  return (
    <div
      className="rounded-3xl p-4 lg:p-5 shadow-sm border transition-colors duration-300"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <h2
        className="text-base lg:text-[17px] font-semibold mb-4"
        style={{ color: "var(--text)" }}
      >
        Upload Document
      </h2>

      <div
        className="border-2 border-dashed rounded-3xl min-h-55 lg:h-60 flex flex-col justify-center items-center text-center px-4 lg:px-5"
        style={{
          borderColor: "var(--border)",
          background: "var(--bg)",
        }}
      >
        <div
          className="w-16 h-12 rounded-3xl flex items-center justify-center mb-4"
          style={{
            background: "rgba(112,130,56,0.12)",
          }}
        >
          <UploadCloud size={22} style={{ color: "var(--primary)" }} />
        </div>

        <h3
          className="text-sm font-medium transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          Drag & Drop your PDF
        </h3>

        <p
          className="text-xs lg:text-sm  mt-1 transition-colors duration-300"
          style={{ color: "var(--subtext)" }}
        >
          or upload it manually
        </p>

        <button
          onClick={handleChooseFile}
          className="mt-5 w-full max-w-xs rounded-xl px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105"
          style={{
            background: "var(--primary)",
          }}
        >
          Choose Document
        </button>

        <p
          className="mt-4 text-xs text-center px-2 transition-colors duration-300"
          style={{ color: "var(--subtext)" }}
        >
          Supports PDF, DOCX, PNG, JPG, JPEG
        </p>

        <input
          type="file"
          accept=".pdf,.docx,.png,.jpg,.jpeg"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />
      </div>
    </div>
  );
}

export default UploadCard;
