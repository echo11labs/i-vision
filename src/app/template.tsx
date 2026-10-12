import { type ReactNode } from "react";
import ScrollReset from "@/components/ScrollReset";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollReset />
      <div className="flex-grow flex flex-col page-soft-land">
        {children}
      </div>
    </>
  );
}
