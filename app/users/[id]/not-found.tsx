import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl">User not found!</h1>
      <p className="text-lg text-gray-500">
        Oooops looks like user you want to find doesnt exist
      </p>
      <Link href="/users">
        <Button>Back to users list</Button>
      </Link>
    </div>
  );
}
