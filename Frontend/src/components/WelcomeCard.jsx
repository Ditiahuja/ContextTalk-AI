import { FileText, FolderOpen, Sparkles, BookOpen, Star } from "lucide-react";

function WelcomeCard({ documentInfo, documents, uploadMode, onPromptClick }) {
  const hasDocuments =
    uploadMode === "workspace" ? documents.length > 0 : !!documentInfo;

  const suggestions = [
    {
      icon: <BookOpen size={17} style={{ color: "var(--primary)" }} />,
      title: "Summarize this document",
      prompt: "Provide a concise summary of this document.",
    },
    {
      icon: <Star size={17} style={{ color: "var(--primary)" }} />,
      title: "Key Takeaways",
      prompt: "List the key takeaways from this document.",
    },
    {
      icon: <BookOpen size={17} style={{ color: "var(--primary)" }} />,
      title: "Important Concepts",
      prompt:
        "Identify the important concepts discussed in this document and explain each briefly.",
    },
    {
      icon: <Sparkles size={17} style={{ color: "var(--primary)" }} />,
      title: "Explain in Detail",
      prompt: "Explain this document in detail in simple language.",
    },
  ];

  return (
    <div
      className="rounded-3xl lg:rounded-[42px] border p-5 sm:p-6 lg:p-8 shadow-sm transition-colors duration-300"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Heading */}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {hasDocuments ? (
          uploadMode === "workspace" ? (
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(112,130,56,0.12)",
              }}
            >
            <FolderOpen size={26} style={{ color: "var(--primary)" }} />
            </div>
          ) : (
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(112,130,56,0.12)",
              }}
            >
              <FileText size={24} style={{ color: "var(--primary)" }} />
            </div>
          )
        ) : (
          <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(112,130,56,0.12)",
              }}
            >
          <Sparkles size={26} style={{ color: "var(--primary)" }} />
          </div>
        )}

        <div>
          <h2
            className="text-2xl lg:text-[25px] font-semibold leading-tight transition-colors duration-300"
            style={{ color: "var(--text)" }}
          >
            {!hasDocuments
              ? "Welcome to ContextTalk AI"
              : uploadMode === "workspace"
              ? "Workspace Ready"
              : "Document Ready"}
          </h2>

          <p
            className="mt-2 text-sm lg:text-[15px] leading-6 transition-colors duration-300"
            style={{ color: "var(--subtext)" }}
          >
            {!hasDocuments
              ? "Upload one or more documents to begin chatting."
              : uploadMode === "workspace"
              ? `${documents.length} document${
                  documents.length > 1 ? "s" : ""
                } indexed successfully. Ask questions across all uploaded PDFs.`
              : `You're now chatting with "${documentInfo?.name}".`}
          </p>
        </div>
      </div>

      {/* Suggestions */}

      <div className="mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {suggestions.map((item) => (
          <button
            key={item.title}
            onClick={() => onPromptClick(item.prompt)}
            className="flex items-center justify-center sm:justify-start gap-2 rounded-2xl border px-4 py-3 text-center sm:text-left transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--card)";
            }}
          >
            {item.icon}

            <span className="text-sm font-medium">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeCard;
