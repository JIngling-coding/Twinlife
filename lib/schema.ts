import * as z from "zod"

export const taskSchema = z.object({
  title: z.string().min(2, { message: "标题至少需要2个字符" }).max(50, { message: "标题不能超过50个字符" }),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in-progress", "done"]),
  category: z.string(),
})

export const profileSchema = z.object({
  name: z.string().min(2, { message: "姓名至少需要2个字符" }),
  email: z.string().email({ message: "请输入有效的电子邮件地址" }),
  bio: z.string().optional(),
  notifications: z.boolean().default(true),
  theme: z.enum(["light", "dark", "system"]).default("system"),
})

export type Task = z.infer<typeof taskSchema>
export type Profile = z.infer<typeof profileSchema>

