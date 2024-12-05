// Dependencies: pnpm install lucide-react

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function SubmitBtn() {
  return (
    <Button disabled className="border bg-white text-black">
      <LoaderCircle
        className="-ms-1 me-2 animate-spin"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      Button
    </Button>
  );
}


