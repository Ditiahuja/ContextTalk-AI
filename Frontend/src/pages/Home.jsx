import { useState, useEffect, useRef } from "react";
import { askQuestion } from "../api/chat";
import { uploadPDF } from "../api/upload";
import ReactMarkdown from "react-markdown";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import WelcomeCard from "../components/WelcomeCard";
import ChatInput from "../components/ChatInput";
import { deleteDocument } from "../api/deleteDocument";

export default function Home() {
  const [documents, setDocuments] = useState([]);
  const [documentInfo, setDocumentInfo] = useState(null);
  const [uploadMode, setUploadMode] = useState("single");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleUpload = async (file, mode) => {
    // Clear previous conversation when a new document is uploaded
    setMessages([]);

    // Show document immediately
    setDocumentInfo({
      name: file.name,
      size: file.size,
      pages: "--",
      uploaded: "Uploading...",
      status: "processing",
    });

    try {
      const response = await uploadPDF(file, mode);

      setDocumentInfo({
        name: response.filename,
        size: file.size,
        pages: response.pages,
        uploaded: "Today",
        status: "ready",
      });

      const newDocument = {
        id: Date.now(),
        name: response.filename,
        pages: response.pages,
        status: "ready",
      };

      if (mode === "workspace") {
        setDocuments((prev) => [...prev, newDocument]);
      } else {
        setDocuments([newDocument]);
      }

      console.log("✅ PDF Indexed Successfully");
    } catch (error) {
      console.error(error);

      setDocumentInfo({
        name: file.name,
        size: file.size,
        pages: "--",
        uploaded: "--",
        status: "failed",
      });
    }
  };

  const handleDelete = async (doc) => {
    try {
      await deleteDocument(doc.name);

      const updatedDocs = documents.filter((d) => d.id !== doc.id);

      setDocuments(updatedDocs);

      if (updatedDocs.length === 0) {
        setDocumentInfo(null);
        setMessages([]);
      } else {
        setDocumentInfo(updatedDocs[updatedDocs.length - 1]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (question) => {
    if (documentInfo?.status !== "ready") return;

    // User message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: question,
      },
    ]);

    // Temporary assistant message
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "",
        loading: true,
      },
    ]);

    try {
      const response = await askQuestion(question);

      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? {
                role: "assistant",
                text: response.answer,
                loading: false,
              }
            : msg
        )
      );
    } catch (error) {
      console.error(error);

      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1
            ? {
                role: "assistant",
                text: "Something went wrong while generating the answer.",
                loading: false,
              }
            : msg
        )
      );
    }
  };

  return (
    <div
      className="h-screen p-2 md:p-3 overflow-hidden transition-colors duration-300"
      style={{
        background: "var(--bg)",
      }}
    >
      <div className="flex h-full flex-col lg:flex-row gap-2 md:gap-5">
        <Sidebar
          onUpload={handleUpload}
          documentInfo={documentInfo}
          uploadMode={uploadMode}
          documents={documents}
          setUploadMode={setUploadMode}
          onDelete={handleDelete}
        />

        <div
         className="flex flex-1 flex-col overflow-hidden rounded-2xl md:rounded-[30px] border shadow-sm transition-colors duration-300"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <Header />

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            {messages.length === 0 ? (
              <WelcomeCard
                documentInfo={documentInfo}
                documents={documents}
                uploadMode={uploadMode}
                onPromptClick={handleSend}
              />
            ) : (
              <div className="space-y-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    {/* Sender */}

                    <span
                      className="mb-2 text-xs md:text-[13px] font-semibold"
                      style={{
                        color:
                          msg.role === "user"
                            ? "var(--primary)"
                            : "var(--subtext)",
                      }}
                    >
                      {msg.role === "user" ? "You" : "🤖 ContextTalk AI"}
                    </span>

                    {/* Bubble */}

                    <div
                      className="max-w-[90%] sm:max-w-[80%] lg:max-w-[65%] rounded-2xl px-4 md:px-5 py-3 md:py-4 text-xs md:text-[13px] leading-6 md:leading-7 shadow-sm transition-colors duration-300"
                      style={
                        msg.role === "user"
                          ? {
                              background: "var(--primary)",
                              color: "#ffffff",
                            }
                          : {
                              background: "var(--card)",
                              color: "var(--text)",
                              border: "1px solid var(--border)",
                            }
                      }
                    >
                      {msg.loading ? (
                        <div className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#556B2F] animate-bounce"></span>

                          <span className="w-1 h-1 rounded-full bg-[#556B2F] animate-bounce [animation-delay:150ms]"></span>

                          <span className="w-1 h-1 rounded-full bg-[#556B2F] animate-bounce [animation-delay:300ms]"></span>

                          <span className="ml-2 text-[#556B2F] font-medium">
                            Thinking...
                          </span>
                        </div>
                      ) : (
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}{" "}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
