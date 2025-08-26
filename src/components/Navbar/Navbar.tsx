import { useThemeContext } from "@/providers/ThemeProvider";
import { Moon, Sun, Users } from "lucide-react";
import { Button } from "../ui/button";

export const Navbar = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <h1>User Management</h1>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="w-9 h-9 p-0"
        >
          {theme === "light" ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
};
