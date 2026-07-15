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
      className="rounded-3xl p-3 shadow-sm border transition-colors duration-300"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <h2
        className="text-[17px] font-semibold mb-4 transition-colors duration-300"
        style={{ color: "var(--text)" }}
      >
        Upload Document
      </h2>

      <div
        className="border-2 border-dashed rounded-3xl h-60 flex flex-col justify-center items-center text-center px-5 transition-colors duration-300"
        style={{
          borderColor: "var(--border)",
          background: "var(--bg)",
        }}
      >
        <div
          className="w-20 h-10 rounded-full flex items-center justify-center mb-5"
          style={{
            background: "rgba(112,130,56,0.15)",
          }}
        >
          <UploadCloud
            size={30}
            style={{ color: "var(--primary)" }}
          />
        </div>

        <h3
          className="text-[13px] font-medium transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          Drag & Drop your PDF
        </h3>

        <p
          className="text-[13px] mt-1 transition-colors duration-300"
          style={{ color: "var(--subtext)" }}
        >
          or upload it manually
        </p>

        <button
          onClick={handleChooseFile}
          className="mt-5 rounded-xl px-8 py-3 text-[12px] font-medium text-white transition-all duration-300 hover:scale-105"
          style={{
            background: "var(--primary)",
          }}
        >
          Choose Document
        </button>

        <p
          className="mt-5 text-[12px] transition-colors duration-300"
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