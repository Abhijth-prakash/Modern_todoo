import z from 'zod'

export const schema = z.object({
    todoo: z.string().min(4, "task is required"),
    startTime: z.string().min(1, "starttime is required"),
    endTime: z.string().min(1, "endTime is required"),
})