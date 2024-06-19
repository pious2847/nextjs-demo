import { string, z } from "zod";

const schema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    // follows: z.bigint()
})

export default schema