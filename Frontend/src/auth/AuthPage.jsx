import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { signup, login as loginApi } from "../api/auth";
import AuthBackground from "../components/AuthBackground";
import AuthInput from "../components/AuthInput";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
// import logo from "../assets/logo.png";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login: loginUser } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const result = await loginApi({
          email: formData.email,
          password: formData.password,
        });

        loginUser(result);
        navigate("/");
      } else {
        await signup(formData);

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthBackground />

      <div className="min-h-screen overflow-y-auto flex items-start lg:items-center justify-center px-6 lg:px-20 pt-10 lg:pt-0">
        <div className="
              mx-auto
              grid
              w-full
              max-w-6xl
              grid-cols-1
              items-center
              gap-8
              lg:gap-12
              lg:grid-cols-[1fr_430px]
              ">
          {/* LEFT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <span className="rounded-full border border-[#556B2F]/20 bg-[#556B2F]/10 px-4 py-2 text-sm font-medium text-[#556B2F]">
              AI Powered Document Assistant
            </span>

            <h1 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#24311A]">
              ContextTalk AI
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Chat naturally with your documents using AI. Upload PDFs, retrieve
              contextual answers instantly, and organize knowledge in one
              intelligent workspace.
            </p>

            <div className="mt-12 space-y-5">
              {[
                "Chat with PDFs",
                "Multi-document workspace",
                "Semantic search",
                "Fast Retreival",
              ].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#556B2F]" />
                  <span className="text-lg text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mobile Branding */}
          <div className="block lg:hidden mb-8 text-center">
            <span className="inline-flex rounded-full border border-[#556B2F]/20 bg-[#556B2F]/10 px-4 py-2 text-xs font-medium text-[#556B2F]">
              AI Powered Document Assistant
            </span>

            <h1 className="mt-5 text-4xl font-bold text-[#24311A]">
              ContextTalk AI
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 px-4">
              Chat naturally with your documents using AI. Upload PDFs, retrieve
              contextual answers instantly, and organize knowledge in one
              intelligent workspace.
            </p>
          </div>

          {/* RIGHT SIDE */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div
              className="
              w-full
             max-w-md
              rounded-[28px]
              border
              border-white/40
              bg-white/75
              backdrop-blur-2xl
              p-8
              shadow-[0_25px_80px_rgba(0,0,0,0.08)]
            "
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#24311A]">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              <p className="mt-3 text-center text-gray-500">
                {isLogin
                  ? "Sign in to continue your AI workspace."
                  : "Create your account to get started."}
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {!isLogin && (
                  <AuthInput
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    icon={User}
                  />
                )}

                <AuthInput
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  icon={Mail}
                />

                <AuthInput
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  icon={Lock}
                />

                {error && <p className="text-sm text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="
      w-full
      rounded-xl
      bg-[#556B2F]
      py-3
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:bg-[#647A38]
      hover:shadow-xl
      active:scale-[0.98]
      disabled:opacity-60
      disabled:cursor-not-allowed
    "
                >
                  {loading
                    ? "Please wait..."
                    : isLogin
                      ? "Sign In"
                      : "Create Account"}
                </button>

                <div className="mt-8 text-center text-sm">
                  <span className="text-gray-500">
                    {isLogin
                      ? "Don't have an account?"
                      : "Already have an account?"}
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 font-semibold text-[#556B2F] hover:underline"
                  >
                    {isLogin ? "Create one" : "Sign In"}
                  </button>
                </div></form>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
