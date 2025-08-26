import { Loader } from "../Loader/Loader";

/**
 * WARNING: must have `ThemeContextProvider` implemented
 */
export const PageLoader = () => {
  return (
    <div className="w-full mt-14 flex justify-center items-center">
      <Loader size={70} />
    </div>
  );
};
