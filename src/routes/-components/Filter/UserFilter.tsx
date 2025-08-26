import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import type { useFilterLogic } from "./useFilterLogic";

export const UserFilter = ({
  filterLogic,
}: {
  filterLogic: ReturnType<typeof useFilterLogic>;
}) => {
  const {
    query,
    onQueryChange,
    selectedCity,
    onCityChange,
    citySelectOptions,
    selectedCompany,
    onCompanyChange,
    companySelectOptions,
    resetAllFilter,
  } = filterLogic;

  const hasActiveFilters =
    !!query || selectedCity !== "all" || selectedCompany !== "all";

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search by name..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Select value={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Select city" />
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

      <Select value={selectedCompany} onValueChange={onCompanyChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Select company" />
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

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={resetAllFilter}
          className="whitespace-nowrap"
        >
          <X className="h-4 w-4 mr-2" />
          Clear
        </Button>
      )}
    </div>
  );
};
