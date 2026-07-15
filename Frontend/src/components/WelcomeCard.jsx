import {
  FileText,
  FolderOpen,
  Sparkles,
  BookOpen,
  Star,
} from "lucide-react";

function WelcomeCard({
  documentInfo,
  documents,
  uploadMode,
  onPromptClick,
}) {
  const hasDocuments =
    uploadMode === "workspace"
      ? documents.length > 0
      : !!documentInfo;

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
      className="rounded-[42px] border p-8 shadow-sm transition-colors duration-300"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Heading */}

      <div className="flex items-center gap-3">
        {hasDocuments ? (
          uploadMode === "workspace" ? (
            <FolderOpen size={28} style={{ color: "var(--primary)" }} />
          ) : (
            <FileText size={28} style={{ color: "var(--primary)" }} />
          )
        ) : (
          <Sparkles size={28} style={{ color: "var(--primary)" }} />
        )}

        <div>
          <h2
            className="text-[25px] font-semibold transition-colors duration-300"
            style={{ color: "var(--text)" }}
          >
            {!hasDocuments
              ? "Welcome to ContextTalk AI"
              : uploadMode === "workspace"
              ? "Workspace Ready"
              : "Document Ready"}
          </h2>

          <p
            className="mt-2 text-[15px] transition-colors duration-300"
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

      <div className="mt-8 flex flex-wrap gap-3">
        {suggestions.map((item) => (
          <button
            key={item.title}
            onClick={() => onPromptClick(item.prompt)}
            className="flex items-center gap-2 rounded-full border px-5 py-3 transition-all duration-300 hover:scale-[1.02]"
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

            <span className="text-[14px]">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WelcomeCard;