import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../auth/useAuth";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          className="text-[20px] font-semibold"
          style={{ color: "var(--text)" }}
        >
          Chat
        </h2>

        <div
          className="w-14 h-0.5 rounded-full mt-2"
          style={{ background: "var(--primary)" }}
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-black/5 transition"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8EDC9] text-[#556B2F] font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <span
              className="text-[14px] font-medium"
              style={{ color: "var(--text)" }}
            >
              {user?.name || "User"}
            </span>

            <ChevronDown size={18} style={{ color: "var(--subtext)" }} />
          </button>

          {open && (
            <div
              className="absolute right-0 mt-3 w-48 overflow-hidden rounded-xl border shadow-2xl z-50"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm transition"
                style={{
                  color: "var(--text)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
