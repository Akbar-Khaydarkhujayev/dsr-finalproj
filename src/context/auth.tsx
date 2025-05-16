import { IUser, useGetMe } from "@/api/get-me";
import { createContext, useContext, ReactNode } from "react";

interface AuthContextValue {
    user: IUser | undefined;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, isLoading: loading, error, refetch } = useGetMe();

    const value: AuthContextValue = {
        user,
        loading,
        error: error instanceof Error ? error : null,
        refetch,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");

    return context;
};
