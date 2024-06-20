import {  z } from "zod";

const schema = z.object({
    title: z.string().min(1),
    // price: z.,
    // follows: z.bigint()
})

export default schema