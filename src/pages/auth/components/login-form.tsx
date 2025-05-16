import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoginUser } from "../api/login";
import { LoginFields, loginSchema } from "../api/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

export function LoginForm() {
    const { mutate, isPending } = useLoginUser();

    const form = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            login: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<LoginFields> = (data) => mutate(data);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, (err) =>
                    console.error(err)
                )}
            >
                <div className="grid gap-6">
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="login"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Login</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid gap-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin" />{" "}
                                    Loading...
                                </>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
