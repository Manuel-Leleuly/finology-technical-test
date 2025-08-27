import { UsersApi } from "@/api/users/users";
import { NetworkLib } from "@/lib/networkLib";
import type { SelectOption } from "@/models/models";
import { Route as UsersRoute } from "@/routes/index";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useUsersLogic = () => {
  const params = UsersRoute.useSearch();

  const {
    data: users,
    isFetching: isFetchingUsers,
    error: usersFetchError,
  } = useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const network = NetworkLib.create();
      return await UsersApi.getAllUsers(network, params);
    },
    throwOnError: false,
  });

  const citySelectOptions: SelectOption[] = useMemo(() => {
    if (!users) return [];
    const citySet = new Set<string>();

    for (const user of users) {
      citySet.add(user.address.city);
    }

    return Array.from(citySet).map((city) => ({
      label: city,
      value: city,
    }));
  }, [users]);

  const companySelectOptions: SelectOption[] = useMemo(() => {
    if (!users) return [];
    const companySet = new Set<string>();

    for (const user of users) {
      companySet.add(user.company.name);
    }

    return Array.from(companySet).map((company) => ({
      label: company,
      value: company,
    }));
  }, [users]);

  return {
    users: users ?? [],
    isFetchingUsers,
    usersFetchError,
    citySelectOptions,
    companySelectOptions,
  };
};
