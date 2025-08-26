import type { UserType } from "@/api/users/model/users";
import type { SelectOption } from "@/models/models";
import { useMemo, useState } from "react";

export const useFilterLogic = (users: UserType[]) => {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");

  const onQueryChange = (newQuery: string) => setQuery(newQuery);
  const onCityChange = (newCity: string) => setSelectedCity(newCity);
  const onCompanyChange = (newCompany: string) =>
    setSelectedCompany(newCompany);

  const resetAllFilter = () => {
    setQuery("");
    setSelectedCity("all");
    setSelectedCompany("all");
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (!user.name.toLowerCase().includes(query)) return false;
      if (selectedCompany !== "all" && user.company.name !== selectedCompany)
        return false;
      if (selectedCity !== "all" && user.address.city !== selectedCity)
        return false;
      return true;
    });
  }, [query, selectedCity, selectedCompany, users]);

  const citySelectOptions: SelectOption[] = useMemo(() => {
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
    query,
    selectedCompany,
    selectedCity,
    onQueryChange,
    onCompanyChange,
    onCityChange,
    resetAllFilter,
    filteredUsers,
    citySelectOptions,
    companySelectOptions,
  };
};
