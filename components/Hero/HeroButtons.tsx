import Button from "@/components/UI/Button";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary">Explore My World</Button>
      <Button variant="outline">View Projects</Button>
    </div>
  );
}