import { useThemeContext } from "@/providers/ThemeProvider";
import { DotLoader } from "react-spinners";
import type { LoaderSizeProps } from "react-spinners/helpers/props";

export const Loader = (props: LoaderSizeProps) => {
  const themeContext = useThemeContext();
  if (!themeContext) {
    throw new Error(
      "Please implement ThemeContextProvider first before using this component"
    );
  }

  const { theme } = themeContext;

  return (
    <DotLoader color={theme === "light" ? "#000000" : "#ffffff"} {...props} />
  );
};
