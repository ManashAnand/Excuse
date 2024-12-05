import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDemo({placeholder,type}:{placeholder:string,type:string}) {
  return (
    <div className="space-y-2 min-w-96">
      <Input
        id="input-07"
        className="border-transparent bg-muted shadow-none"
        placeholder={placeholder || "Email"}
        type={type || "email"}
      />
    </div>
  );
}
