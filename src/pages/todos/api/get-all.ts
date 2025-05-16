import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axios";

export interface ITodo {
    id: number;
    title: string;
    description: string;
    createdBy: string;
}

const getTodos = (): Promise<ITodo[]> =>
    axiosInstance.get("todos").then((res) => res.data);

export const useGetTodos = () =>
    useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
    });
