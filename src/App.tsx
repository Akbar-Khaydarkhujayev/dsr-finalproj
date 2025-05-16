import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";

import { router } from "./router";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/auth";

export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
                <Toaster />
            </ThemeProvider>
        </AuthProvider>
    );
}
