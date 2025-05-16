import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axios";
import { useNavigate } from "react-router-dom";

export const logout = (): Promise<unknown> =>
    axiosInstance.post("logout").then((res) => res.data);

export const useLogoutUser = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            navigate("/login");

            setTimeout(() => {
                queryClient.clear();
            }, 0);
        },
    });
};
