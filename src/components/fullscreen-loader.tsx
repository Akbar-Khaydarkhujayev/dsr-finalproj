import { Loader2 } from "lucide-react";

interface FullscreenLoaderProps {
    isLoading: boolean;
}

export default function FullscreenLoader({ isLoading }: FullscreenLoaderProps) {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 h-screen w-screen">
            <Loader2 className="animate-spin text-white w-10 h-10" />
        </div>
    );
}
