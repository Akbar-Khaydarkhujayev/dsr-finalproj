import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(1, "Requried!"),
    description: z.string().min(1, "Requried!"),
});

export type FormFields = z.infer<typeof formSchema>;
