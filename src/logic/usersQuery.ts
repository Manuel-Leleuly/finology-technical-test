import { UsersApi } from "@/api/users/users";
import { NetworkLib } from "@/lib/networkLib";
import { queryOptions } from "@tanstack/react-query";

export const usersQueryOptions = (abortController?: AbortController) =>
  queryOptions({
    queryKey: ["users"],
    queryFn: async () => {
      const network = NetworkLib.create({ signal: abortController?.signal });
      return await UsersApi.getAllUsers(network);
    },
    throwOnError: false,
  });
