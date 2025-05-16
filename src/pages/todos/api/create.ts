import type { FormFields } from "./schema";
import { axiosInstance } from "@/api/axios";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const createTodo = (input: FormFields) =>
    axiosInstance.post("todos", input).then((res) => res.data);

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            toast({
                title: "Todo created",
                description: "Todo has been created successfully",
            });
            queryClient.invalidateQueries({
                queryKey: ["todos"],
            });
        },
    });
};
