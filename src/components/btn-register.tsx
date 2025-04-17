import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function GetStartedButton() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Button 
      className="bg-teal-800 hover:bg-teal-700 text-white rounded-full pr-2 pl-6 py-6 flex items-center justify-between gap-2 transition-colors relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <span className="text-lg font-medium">Get Started</span>
      <div className="relative h-8 w-8">
        {/* Container for animations */}
        <span 
          className={`bg-white rounded-full p-2 flex items-center justify-center absolute inset-0 transition-transform duration-300 ${
            isHovering ? "translate-x-full opacity-0" : "translate-x-0"
          }`}
        >
          <ArrowRight className="h-4 w-4 text-teal-800" />
        </span>
        
        <span 
          className={`bg-white rounded-full p-2 flex items-center justify-center absolute inset-0 transition-transform duration-300 ${
            isHovering ? "translate-x-0" : "-translate-x-full opacity-0"
          }`}
        >
          <ArrowRight className="h-4 w-4 text-teal-800" />
        </span>
      </div>
    </Button>
  );
}