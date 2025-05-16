import { RoleGuard } from "@/components/auth/role-guard";
import AppLayout from "@/layouts/layout";
import LoginPage from "@/pages/auth/login";
import ErrorPage from "@/pages/error";
import NotFoundPage from "@/pages/error/not-found";
import TodosPage from "@/pages/todos";
import UsersPage from "@/pages/users";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    {
                        path: "/",
                        element: <TodosPage />,
                    },
                    {
                        path: "users",
                        element: (
                            <RoleGuard allowedRoles={["admin"]}>
                                <UsersPage />
                            </RoleGuard>
                        ),
                    },
                ],
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
]);
