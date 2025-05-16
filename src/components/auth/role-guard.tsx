import { useAuth } from "@/context/auth";
import NotAllowedPage from "@/pages/error/not-allowed";
import FullscreenLoader from "../fullscreen-loader";

export function RoleGuard({
    allowedRoles,
    children,
}: {
    allowedRoles: string[];
    children: JSX.Element;
}) {
    const { user, loading } = useAuth();

    if (loading) return <FullscreenLoader isLoading />;

    if (!user || !allowedRoles.includes(user.role)) {
        return <NotAllowedPage />;
    }

    return children;
}
