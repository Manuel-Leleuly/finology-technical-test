import { PageLoader } from "@/components/PageLoader/PageLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { usersQueryOptions } from "../logic/usersQuery";
import { useFilterLogic } from "./-components/Filter/useFilterLogic";
import { UserFilter } from "./-components/Filter/UserFilter";
import { UserTable } from "./-components/UserTable/UserTable";

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({
    meta: [{ title: "Finology Technical Test" }],
  }),
  pendingComponent: () => {
    return <PageLoader />;
  },
});

function App() {
  const {
    data: users,
    isFetching: isFetchingUsers,
    error: usersFetchError,
  } = useQuery(usersQueryOptions());
  const filterLogic = useFilterLogic(users ?? []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <UserFilter filterLogic={filterLogic} />
          <UserTable
            users={filterLogic.filteredUsers}
            isLoading={isFetchingUsers}
            error={usersFetchError}
          />
        </CardContent>
      </Card>
    </div>
  );
}
