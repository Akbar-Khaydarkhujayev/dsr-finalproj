import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axios";
import { IUser as UserType } from "@/api/get-me";

type IUser = UserType & { login: string };

const getUsers = (): Promise<IUser[]> =>
    axiosInstance.get("users").then((res) => res.data);

export const useGetUsers = () =>
    useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
