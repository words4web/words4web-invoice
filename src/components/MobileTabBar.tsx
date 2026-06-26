import { MobileTabBarProps } from "@/types/forms";

export function MobileTabBar({ activeTab, onTabChange }: MobileTabBarProps) {
  return (
    <div className="sm:hidden flex border-b border-gray-200 bg-white shrink-0">
      <button
        onClick={() => onTabChange("form")}
        className={`flex-1 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
          activeTab === "form"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}>
        ✏️ Form
      </button>
      <button
        onClick={() => onTabChange("preview")}
        className={`flex-1 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
          activeTab === "preview"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}>
        📄 Preview
      </button>
    </div>
  );
}
