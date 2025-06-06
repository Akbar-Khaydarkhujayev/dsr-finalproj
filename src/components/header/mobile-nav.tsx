import * as React from "react";

import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { mainNav } from "./docs";
import { Link, LinkProps, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";

export function MobileNav() {
    const { user } = useAuth();

    const [open, setOpen] = React.useState(false);

    const onOpenChange = React.useCallback((open: boolean) => {
        setOpen(open);
    }, []);

    const filteredNav = mainNav.filter((item) =>
        item.roles.includes(user?.role ?? "user")
    );

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>
                <Button
                    variant="ghost"
                    className="-ml-2 mr-2 h-8 w-8 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="!size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 9h16.5m-16.5 6.75h16.5"
                        />
                    </svg>
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[60svh] p-0">
                <div className="overflow-auto p-6">
                    <div className="flex flex-col space-y-3">
                        {filteredNav?.map(
                            (item) =>
                                item.href && (
                                    <MobileLink
                                        key={item.href}
                                        to={item.href}
                                        onOpenChange={setOpen}
                                    >
                                        {item.title}
                                    </MobileLink>
                                )
                        )}
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

interface MobileLinkProps extends LinkProps {
    to: string;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
}

function MobileLink({
    to,
    onOpenChange,
    className,
    children,
    ...props
}: MobileLinkProps) {
    const navigate = useNavigate();
    return (
        <Link
            to={to}
            onClick={() => {
                navigate(to.toString());
                onOpenChange?.(false);
            }}
            className={cn("text-base", className)}
            {...props}
        >
            {children}
        </Link>
    );
}
