import {
  FileText,
  Star,
  BookOpen,
  Sparkles,
} from "lucide-react";

const prompts = [
  {
    icon: <FileText size={16} />,
    text: "Summarize this document",
  },
  {
    icon: <Star size={16} />,
    text: "Key takeaways",
  },
  {
    icon: <BookOpen size={16} />,
    text: "Important concepts",
  },
  {
    icon: <Sparkles size={16} />,
    text: "Explain in detail",
  },
];

function PromptSuggestions() {
  return (
    <div className="mt-7 flex flex-wrap gap-4">

      {prompts.map((item, index) => (

        <button
          key={index}
          className="
            flex
            items-center
            gap-3
            rounded-full
            border
            border-[#E8E7DD]
            bg-white
            px-5
            py-2.5
            text-[12px]
            font-medium
            text-gray-700
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[#708238]
            hover:bg-[#EEF3DB]
            hover:shadow-md
          "
        >

          <span className="text-[#708238]">
            {item.icon}
          </span>

          {item.text}

        </button>

      ))}

    </div>
  );
}

export default PromptSuggestions;