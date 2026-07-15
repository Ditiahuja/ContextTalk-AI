import { useState, useEffect, useRef } from "react";
import { Paperclip, Mic, SendHorizontal } from "lucide-react";

function ChatInput({ onSend }) {
  const [question, setQuestion] = useState("");
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.log("Speech Recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let transcript = "";
      let isFinal = false;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          isFinal = true;
        }
      }

      setQuestion(transcript);

      if (isFinal) {
        transcriptRef.current = transcript;
      }
    };

    recognition.onend = () => {
      setIsListening(false);

      setTimeout(() => {
        const finalQuestion = transcriptRef.current.trim();

        if (!finalQuestion) return;

        onSend(finalQuestion);

        setQuestion("");
        transcriptRef.current = "";
      }, 600);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onSend]);

  const handleMic = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      transcriptRef.current = "";
      recognitionRef.current.start();
    }
  };

  const handleSend = () => {
    const text = question.trim();

    if (!text) return;

    onSend(text);

    setQuestion("");
    transcriptRef.current = "";
  };

  return (
    <div
      className="border-t px-6 py-3 transition-colors duration-300"
      style={{
        borderColor: "var(--border)",
      }}
    >
      <div
        className="flex items-center gap-4 rounded-full border px-4 h-12 shadow-sm transition-colors duration-300"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Attachment */}

        <Paperclip
          size={20}
          style={{
            color: "var(--primary)",
            cursor: "pointer",
          }}
        />

        {/* Input */}

        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder={
            isListening
              ? "Listening..."
              : "Ask something about your document..."
          }
          className="flex-1 bg-transparent outline-none text-[13px]"
          style={{
            color: "var(--text)",
          }}
        />

        {/* Microphone */}

        <button
          onClick={handleMic}
          className="rounded-full p-2 transition-all duration-300"
          style={{
            background: isListening ? "#FEE2E2" : "transparent",
            color: isListening ? "#DC2626" : "var(--primary)",
          }}
        >
          <Mic
            size={20}
            className={isListening ? "animate-pulse" : ""}
          />
        </button>

        {/* Send */}

        <button
          onClick={handleSend}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-110"
          style={{
            background: "var(--primary)",
          }}
        >
          <SendHorizontal size={16} />
        </button>
      </div>

      {isListening && (
        <p className="mt-2 text-center text-[12px] text-red-500 animate-pulse">
          🎙️ Listening...
        </p>
      )}
    </div>
  );
}

export default ChatInput;