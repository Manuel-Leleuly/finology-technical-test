import { Route as UsersRoute } from "@/routes/index";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const useFilterLogic = () => {
  const navigate = useNavigate();
  const params = UsersRoute.useSearch();

  const [query, setQuery] = useState(params.name_like ?? "");
  const [selectedCity, setSelectedCity] = useState(
    params["address.city"] ?? "all"
  );
  const [selectedCompany, setSelectedCompany] = useState(
    params["company.name"] ?? "all"
  );

  useEffect(() => {
    navigate({
      to: "/",
      search: {
        name_like: !!query.length ? query : undefined,
        "address.city": selectedCity !== "all" ? selectedCity : undefined,
        "company.name": selectedCompany !== "all" ? selectedCompany : undefined,
      },
    });
  }, [query, selectedCity, selectedCompany]);

  const filterForm = useForm({
    defaultValues: {
      searchQuery: query,
      city: selectedCity,
      company: selectedCompany,
    },
  });

  const onChangeQuery = (newQuery: string) => setQuery(newQuery);
  const onChangeCity = (newCity: string) => setSelectedCity(newCity);
  const onChangeCompany = (newCompany: string) =>
    setSelectedCompany(newCompany);

  const resetAllFilter = () => {
    setQuery("");
    setSelectedCity("all");
    setSelectedCompany("all");
    filterForm.reset();
  };

  return {
    filterForm,
    query,
    selectedCity,
    selectedCompany,
    onChangeQuery,
    onChangeCity,
    onChangeCompany,
    resetAllFilter,
  };
};
