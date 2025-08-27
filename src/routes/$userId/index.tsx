import { UsersApi } from "@/api/users/users";
import { ErrorPage } from "@/components/Error/ErrorPage";
import { PageLoader } from "@/components/PageLoader/PageLoader";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NetworkLib } from "@/lib/networkLib";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { isAxiosError } from "axios";
import {
  Building,
  Globe,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Target,
} from "lucide-react";

export const Route = createFileRoute("/$userId/")({
  component: UserDetailPage,
  loader: async ({ params, context, abortController }) => {
    const userDetail = await context.queryClient.fetchQuery({
      queryKey: ["userDetail", params],
      queryFn: async () => {
        const network = NetworkLib.create({ signal: abortController.signal });
        return await UsersApi.getUserById(network, params.userId);
      },
    });

    if (Object.keys(userDetail).length === 0) throw notFound();
    return {
      user: userDetail,
    };
  },
  notFoundComponent: () => {
    return <ErrorPage message="user not found" />;
  },
  errorComponent: ({ error }) => {
    let errorMessage = "Failed to get user";
    if (isAxiosError(error)) {
      const response = error.response;
      if (response) {
        const { status } = response;
        if (status === 404) {
          errorMessage = "User not found";
        } else if (status.toString()[0] === "5") {
          errorMessage = "Internal server error";
        }
      }
    }

    return <ErrorPage message={errorMessage} />;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      {
        title: `Finology Technical Test | ${loaderData?.user.name ?? params.userId}`,
      },
    ],
  }),
  pendingComponent: () => {
    return <PageLoader />;
  },
});

function UserDetailPage() {
  const { user } = Route.useLoaderData();

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList className="text-lg">
          <BreadcrumbItem>
            {/* BreadcrumbLink from shadcn somehow refreshes the page */}
            <Link
              to="/"
              data-slot="breadcrumb-link"
              className="hover:text-foreground transition-colors font-semibold"
            >
              User List
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{user.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <div>{user.name}</div>
              <div className="text-muted-foreground">@{user.username}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-3">Contact Information</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {user.website}
                </a>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Address
            </h3>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div>
                {user.address.street}, {user.address.suite}
              </div>
              <div>
                {user.address.city}, {user.address.zipcode}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="mb-3 flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company
            </h3>
            <div className="space-y-4">
              <div>
                <Badge variant="default" className="mb-2">
                  {user.company.name}
                </Badge>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Catch Phrase</span>
                  </div>
                  <p>"{user.company.catchPhrase}"</p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Business</span>
                  </div>
                  <p>{user.company.bs}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
