import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { FormFields } from "./schema";
import { axiosInstance } from "@/api/axios";

const editTodo = (id: number, input: FormFields) =>
    axiosInstance.patch(`todos/${id}`, input).then((res) => res.data);

export const useEditTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, input }: { id: number; input: FormFields }) =>
            editTodo(id, input),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["totos"],
            });
            queryClient.invalidateQueries({
                queryKey: ["toto"],
            });
        },
    });
};
