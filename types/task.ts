export type TaskStatus = "进行中" | "待办" | "已完成" | "已延期"

export type TaskPeriod = {
  type: "daily" | "weekly" | "monthly" | "quarterly" | "yearly"
  interval: number // 每隔多少天/周/月/季度/年
  endDate?: string // 结束日期，可选
}

export type Task = {
  id: string
  name: string
  project: string
  dueDate: string
  tags: string[]
  priority: "高" | "中" | "低"
  department: string
  status: TaskStatus
  description?: string
  isCompleted: boolean
  parentId?: string // 父任务ID
  subtasks?: Task[] // 子任务
  period?: TaskPeriod // 周期任务设置
  recurringProcessed?: boolean // 标记是否已处理过周期任务
  periodIndicator?: string // 周期标识，如 W12, M3, Q2 等
}

export const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case "进行中":
      return "text-blue-500 border-blue-500"
    case "待办":
      return "text-yellow-500 border-yellow-500"
    case "已完成":
      return "text-green-500 border-green-500"
    case "已延期":
      return "text-red-500 border-red-500"
  }
}

