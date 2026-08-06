import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AuthInput({
  label,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="text-sm md:text-[15px] font-medium text-[#374151]"
      >
        {label}
      </label>

      <div className="relative group">
        {/* Left Icon */}
        {Icon && (
          <Icon
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-[#556B2F]"
          />
        )}

        <input
          id={name}
          name={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={
            name === "email"
              ? "email"
              : isPassword
                ? "current-password"
                : "name"
          }
          className="
               w-full
               h-12 md:h-13
               rounded-3xl
               border
               border-[#E5E7EB]
               bg-white/70
               pl-12
               pr-12
               text-sm md:text-[15px]
               text-[#1F2937]
               placeholder:text-gray-400
               backdrop-blur-sm
               outline-none
               transition-all
               duration-300
               focus:border-[#556B2F]
               focus:bg-white
               focus:ring-4
               focus:ring-[#556B2F]/10
"
        />

        {/* Password Toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 transition-colors duration-300 hover:text-[#556B2F]"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
}
