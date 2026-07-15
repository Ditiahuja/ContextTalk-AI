import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

function Header() {
  return (
    <header
      className="h-20 px-10 flex items-center justify-between border-b transition-colors duration-300"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Left */}
      <div>
        <h2
          className="text-[20px] font-semibold transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          Chat
        </h2>

        <div
          className="w-14 h-0.75 rounded-full mt-2"
          style={{ background: "var(--primary)" }}
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div
          className="w-11 h-11 rounded-full flex items-center justify-center font-medium transition-colors duration-300"
          style={{
            background: "#E7EDCC",
            color: "#556B2F",
          }}
        >
          U
        </div>

        <span
          className="text-[14px] transition-colors duration-300"
          style={{ color: "var(--text)" }}
        >
          User
        </span>

        <ChevronDown
          size={18}
          style={{ color: "var(--subtext)" }}
        />
      </div>
    </header>
  );
}

export default Header;