import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormFields } from "../api/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateTodo } from "../api/create";
import { Loader2 } from "lucide-react";
import { useEditTodo } from "../api/edit";
import { DialogProps } from "@radix-ui/react-dialog";
import { useGetTodoById } from "../api/get-by-id";
import { useEffect } from "react";
import FullscreenLoader from "@/components/fullscreen-loader";

interface EditTodoDialogProps extends DialogProps {
    editedTodoId?: number;
    onOpenChange(open: boolean): void;
}

export function EditTodoDialog({
    open,
    onOpenChange,
    editedTodoId,
    ...props
}: EditTodoDialogProps) {
    const { data: todo, isLoading } = useGetTodoById(editedTodoId);

    const { mutate: createTodo, isPending: isCreatePenging } = useCreateTodo();
    const { mutate: editTodo, isPending: isEditPending } = useEditTodo();

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (todo && !isLoading) {
            form.reset({
                title: todo.title,
                description: todo.description,
            });
        }
    }, [todo, form, editedTodoId, isLoading]);

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        if (editedTodoId) {
            editTodo(
                { id: editedTodoId, input: data },
                { onSuccess: () => handleOpenChange(false) }
            );
        } else {
            createTodo(data, { onSuccess: () => handleOpenChange(false) });
        }
    };

    function handleOpenChange(open: boolean) {
        if (!open)
            form.reset({
                title: "",
                description: "",
            });
        onOpenChange(open);
    }

    return (
        <>
            <FullscreenLoader isLoading={isLoading} />

            <Dialog open={open} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {editedTodoId ? "Edit ToDo" : "Add ToDo"}
                        </DialogTitle>
                        <DialogDescription>
                            Input your todo information here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-6" {...props}>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Description
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button
                                        disabled={
                                            isCreatePenging || isEditPending
                                        }
                                        type="submit"
                                        className="w-full"
                                    >
                                        {isCreatePenging || isEditPending ? (
                                            <>
                                                <Loader2 className="animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            "Save"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
