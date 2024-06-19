import {  z } from "zod";

const schema = z.object({
    title: z.string().min(5),
    price: z.number(),
    // follows: z.bigint()
})

export default schema