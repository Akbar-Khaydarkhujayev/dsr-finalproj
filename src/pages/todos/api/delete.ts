import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axios";

const deleteTodo = (id: number | string) =>
    axiosInstance.delete(`todos/${id}`).then((res) => res.data);

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
            toast.success("Successfully deleted");
        },
    });
};
