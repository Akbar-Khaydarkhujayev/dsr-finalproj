import { PageHeader, PageHeaderHeading } from "@/components/header/text";

import { useGetUsers } from "./api/get-all";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersPage() {
    const { data: users, isLoading } = useGetUsers();

    const renderLoading = () =>
        Array.from({ length: 16 }).map((_, idx) => (
            <TableRow key={idx}>
                <TableCell>
                    <Skeleton className="h-4 w-6" />
                </TableCell>
                <TableCell className="w-1/3">
                    <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="w-1/3">
                    <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell className="w-1/3">
                    <Skeleton className="h-4 w-24" />
                </TableCell>
            </TableRow>
        ));

    const renderRows = () =>
        users?.map((user, index) => (
            <TableRow key={index}>
                <TableCell>{++index}</TableCell>
                <TableCell className="w-1/3">{user.name}</TableCell>
                <TableCell className="w-1/3">{user.login}</TableCell>
                <TableCell className="w-1/3">{user.role}</TableCell>
            </TableRow>
        ));

    return (
        <>
            <PageHeader>
                <PageHeaderHeading>Users</PageHeaderHeading>
            </PageHeader>
            <div className="flex flex-col flex-grow">
                <div className="container-wrapper flex flex-col flex-grow">
                    <ScrollArea className="w-full h-[calc(100vh-130px)] relative">
                        <Table className=" border-b">
                            <TableHeader className="sticky top-0 bg-muted z-10">
                                <TableRow>
                                    <TableHead>№</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Login</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? renderLoading() : renderRows()}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </div>
            </div>
        </>
    );
}
