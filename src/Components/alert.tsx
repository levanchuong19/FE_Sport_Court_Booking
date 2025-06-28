import { AlertCircle, Info } from "lucide-react";
import { cn } from "../Utils/utils";

export function Alert({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "destructive";
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 shadow-md animate-slide-in transition-all duration-300",
        variant === "destructive"
          ? "bg-red-50 border-red-300 text-red-800"
          : "bg-white border-gray-200 text-gray-800"
      )}
    >
      <div className="flex items-start gap-3">
        {variant === "destructive" ? (
          <AlertCircle className="w-5 h-5 mt-1 text-red-500" />
        ) : (
          <Info className="w-5 h-5 mt-1 text-blue-500" />
        )}
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
}

export function AlertTitle({ children }: { children: React.ReactNode }) {
  return <div className="font-semibold text-base mb-1">{children}</div>;
}

export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div className="text-sm leading-relaxed">{children}</div>;
}