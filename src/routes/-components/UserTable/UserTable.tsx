import type { UserType } from "@/api/users/model/users";
import { Loader } from "@/components/Loader/Loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";

export const UserTable = ({
  users,
  isLoading,
  error,
}: {
  users: UserType[];
  isLoading: boolean;
  error: Error | null;
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="w-20">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableContent users={users} isLoading={isLoading} error={error} />
        </TableBody>
      </Table>
    </div>
  );
};

const TableContent = ({
  users,
  isLoading,
  error,
}: {
  users: UserType[];
  isLoading: boolean;
  error: Error | null;
}) => {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="py-8 text-muted-foreground">
          <div className="w-full flex justify-center items-center">
            <Loader size={30} />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  if (error) {
    return (
      <TableRow>
        <TableCell
          colSpan={5}
          className="text-center py-8 text-muted-foreground"
        >
          Oops. There's an issue when fetching the users. Please try again
        </TableCell>
      </TableRow>
    );
  }

  if (!users.length) {
    return (
      <TableRow>
        <TableCell
          colSpan={5}
          className="text-center py-8 text-muted-foreground"
        >
          No users found
        </TableCell>
      </TableRow>
    );
  }

  return users.map((user) => (
    <TableRow key={user.id}>
      <TableCell>
        <div>
          <div>{user.name}</div>
          <div className="text-muted-foreground">@{user.username}</div>
        </div>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Badge variant="secondary">{user.address.city}</Badge>
      </TableCell>
      <TableCell className="max-w-48 truncate">{user.company.name}</TableCell>
      <TableCell>
        <Link to="/$userId" params={{ userId: user.id.toString() }}>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  ));
};
