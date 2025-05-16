import { axiosInstance } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export type IUser = {
    name: string;
    role: string;
};

const getMe = (): Promise<IUser> =>
    axiosInstance.get("me").then((res) => res.data);

export const useGetMe = () =>
    useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        enabled: window.location.pathname !== "/login",
    });
