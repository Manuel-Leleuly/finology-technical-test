import { UsersFilterSchema } from "@/api/users/model/users";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { UserFilter } from "./-components/Filter/UserFilter";
import { UserTable } from "./-components/UserTable/UserTable";
import { useUsersLogic } from "./-logic/useUsersLogic";

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({
    meta: [{ title: "Finology Technical Test" }],
  }),
  pendingComponent: () => {
    return <PageLoader />;
  },
  validateSearch: UsersFilterSchema,
});

function App() {
  const {
    users,
    isFetchingUsers,
    usersFetchError,
    citySelectOptions,
    companySelectOptions,
  } = useUsersLogic();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <UserFilter
            citySelectOptions={citySelectOptions}
            companySelectOptions={companySelectOptions}
          />
          <UserTable
            users={users}
            isLoading={isFetchingUsers}
            error={usersFetchError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
