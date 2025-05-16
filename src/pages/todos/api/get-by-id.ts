import { axiosInstance } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { ITodo } from "./get-all";

export const getTodoById = (id?: number): Promise<ITodo> =>
    axiosInstance.get(`todos/${id}`).then((res) => res.data);

export const useGetTodoById = (id?: number) =>
    useQuery({
        queryKey: ["todos", id],
        queryFn: () => getTodoById(id),
        enabled: !!id,
    });
