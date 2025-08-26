import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { Button } from "../ui/button";

export const ErrorPage = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col justify-center items-center gap-4",
        className
      )}
    >
      <SearchX strokeWidth={1} size={100} />
      <p>{message}</p>
      <Link to="/">
        <Button
          variant={"link"}
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Go back home
        </Button>
      </Link>
    </div>
  );
};
