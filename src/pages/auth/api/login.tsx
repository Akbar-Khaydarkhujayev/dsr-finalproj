import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/api/axios";
import { LoginFields } from "../api/schema";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";

const login = (input: LoginFields): Promise<string> =>
    axiosInstance.post("login", input).then((res) => res.data);

export const useLoginUser = () => {
    const { refetch } = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            refetch();
            navigate("/");
        },
    });
};
