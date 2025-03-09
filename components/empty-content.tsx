import type { FC } from "react"

export const EmptyContent: FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">欢迎使用双生世界：人生管理系统</h2>
        <p className="mt-2 text-muted-foreground">请等待详细需求后创建具体内容</p>
      </div>
    </div>
  )
}

