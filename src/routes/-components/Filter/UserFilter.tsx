import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectOption } from "@/models/models";
import { useFilterLogic } from "@/routes/-logic/useFilterLogic";
import { Search, X } from "lucide-react";

export const UserFilter = ({
  citySelectOptions,
  companySelectOptions,
}: {
  citySelectOptions: SelectOption[];
  companySelectOptions: SelectOption[];
}) => {
  const {
    filterForm,
    query,
    selectedCity,
    selectedCompany,
    onChangeCity,
    onChangeCompany,
    onChangeQuery,
    resetAllFilter,
  } = useFilterLogic();

  const hasActiveFilters =
    !!query || selectedCity !== "all" || selectedCompany !== "all";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <filterForm.Field
          name="searchQuery"
          validators={{
            onChangeAsyncDebounceMs: 300,
            onChangeAsync: async ({ value }) => onChangeQuery(value),
          }}
        >
          {(field) => (
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name..."
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
        </filterForm.Field>

        <filterForm.Field name="city">
          {(field) => (
            <Select
              value={field.state.value}
              onValueChange={(value) => {
                field.handleChange(value);
                onChangeCity(value);
              }}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select city">
                  {field.state.value === "all"
                    ? "All cities"
                    : field.state.value}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All cities</SelectItem>
                {citySelectOptions.map((city) => (
                  <SelectItem key={city.value} value={city.value}>
                    {city.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </filterForm.Field>

        <filterForm.Field name="company">
          {(field) => (
            <Select
              value={field.state.value}
              onValueChange={(value) => {
                field.handleChange(value);
                onChangeCompany(value);
              }}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Select company">
                  {field.state.value === "all"
                    ? "All companies"
                    : field.state.value}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All companies</SelectItem>
                {companySelectOptions.map((company) => (
                  <SelectItem key={company.value} value={company.value}>
                    {company.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </filterForm.Field>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={resetAllFilter}
            className="whitespace-nowrap"
            type="button"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>
    </form>
  );
};
