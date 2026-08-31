import Button from "@/components/UI/Button";
import Link from "next/link";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* <Button variant="primary">Explore My World</Button> */}
     <Link href="/projects" className="mt-2">
                 <Button variant="outline">View Projects</Button>
               </Link>
    </div>
  );
}