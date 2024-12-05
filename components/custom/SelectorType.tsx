import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDemo() {
  return (
    <div className="space-y-2 border-transparent bg-muted shadow-none rounded-md">
      <Select defaultValue="s1">
        <SelectTrigger id="select-31">
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <SelectItem value="s1">pdf</SelectItem>
          <SelectItem value="s2">doc/word</SelectItem>
          {/* <SelectItem value="s3">Astro</SelectItem>
          <SelectItem value="s4">Gatsby</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
}
