import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GetStartedButton() {
  return (
    <Link href="/sign-up" passHref>
      <Button 
        className="bg-teal-800 hover:bg-teal-700 text-white rounded-full pr-2 pl-6 py-6 flex items-center justify-between gap-2 transition-colors relative overflow-hidden group"
      >
        <span className="text-lg font-normal">Get Started</span>
        <div className="relative h-8 w-8">
          <span 
            className="bg-white rounded-full p-2 flex items-center justify-center absolute inset-0 transition-transform duration-300 translate-x-0 group-hover:translate-x-full group-hover:opacity-0"
          >
            <ArrowRight className="h-4 w-4 text-teal-800" />
          </span>
          
          <span 
            className="bg-white rounded-full p-2 flex items-center justify-center absolute inset-0 transition-transform duration-300 -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          >
            <ArrowRight className="h-4 w-4 text-teal-800" />
          </span>
        </div>
      </Button>
    </Link>
  );
}