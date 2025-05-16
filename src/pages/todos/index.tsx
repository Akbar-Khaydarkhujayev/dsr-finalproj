import { PageHeader, PageHeaderHeading } from "@/components/header/text";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetTodos } from "./api/get-all";
import { EditTodoDialog } from "./components/edit-todo-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteTodo } from "./api/delete";
import { useState } from "react";
import { ConfirmDialog } from "@/components/confirm-dialog";
import { useAuth } from "@/context/auth";
import { UserRoles } from "@/types";

export default function TodosPage() {
    const { user } = useAuth();

    const [open, setOpen] = useState(false);
    const [editedTodoId, setEditedTodoId] = useState<number | undefined>();

    const { mutate: deleteTodo } = useDeleteTodo();
    const { data: todos, isLoading } = useGetTodos();

    function handleOpenChange(open: boolean) {
        setOpen(open);
        if (open) setEditedTodoId(undefined);
    }

    const renderLoading = () => {
        return Array.from({ length: 16 }).map((_, idx) => (
            <TableRow key={idx}>
                <TableCell>
                    <Skeleton className="h-4 w-6" />
                </TableCell>
                <TableCell className="w-1/3">
                    <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell className="w-1/3">
                    <Skeleton className="h-4 w-48" />
                </TableCell>
                <TableCell className="w-1/3">
                    <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                    <div className="flex justify-end gap-4">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                </TableCell>
            </TableRow>
        ));
    };

    const renderRows = () => {
        return todos?.map((todo, index) => (
            <TableRow key={todo.id}>
                <TableCell>{++index}</TableCell>
                <TableCell className="w-1/3">{todo.title}</TableCell>
                <TableCell className="w-1/3">{todo.description}</TableCell>
                <TableCell className="w-1/3">{todo.createdBy}</TableCell>
                <TableCell>
                    <div className="flex justify-end items-center gap-4 -m-2">
                        <Button
                            size="icon"
                            variant="secondary"
                            onClick={() => {
                                setEditedTodoId(todo.id);
                                setOpen(true);
                            }}
                        >
                            <Pencil />
                        </Button>
                        {(user?.role === UserRoles.ADMIN ||
                            user?.role === todo.createdBy) && (
                            <ConfirmDialog
                                onConfirm={() => deleteTodo(todo.id)}
                            >
                                <Button size="icon" variant="destructive">
                                    <Trash2 />
                                </Button>
                            </ConfirmDialog>
                        )}
                    </div>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <>
            <EditTodoDialog
                open={open}
                editedTodoId={editedTodoId}
                onOpenChange={handleOpenChange}
            />

            <PageHeader className="flex justify-between">
                <PageHeaderHeading>TODOS</PageHeaderHeading>
                <Button onClick={() => handleOpenChange(true)}>Add ToDo</Button>
            </PageHeader>

            <div className="flex flex-col flex-grow">
                <div className="container-wrapper flex flex-col flex-grow">
                    <ScrollArea className="w-full h-[calc(100vh-130px)] relative">
                        <Table className="border-b">
                            <TableHeader className="sticky top-0 bg-muted z-10">
                                <TableRow>
                                    <TableHead>№</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Created By</TableHead>
                                    <TableHead />
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
