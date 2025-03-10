"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import type { Task } from "@/types/task"
import { getTagColors } from "@/utils/tag-colors"

interface NewTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (task: Task) => void
}

export function NewTaskDialog({ open, onOpenChange, onSave }: NewTaskDialogProps) {
  const [newTask, setNewTask] = useState<Partial<Task>>({
    name: "",
    project: "",
    dueDate: "",
    tags: [],
    priority: "中",
    department: "",
    status: "待办",
    description: "",
  })
  const [newTag, setNewTag] = useState("")

  const handleChange = (field: keyof Task, value: any) => {
    setNewTask({ ...newTask, [field]: value })
  }

  const handleAddTag = () => {
    if (newTag.trim() && !newTask.tags?.includes(newTag.trim())) {
      setNewTask({
        ...newTask,
        tags: [...(newTask.tags || []), newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setNewTask({
      ...newTask,
      tags: newTask.tags?.filter((t) => t !== tag) || [],
    })
  }

  const handleSave = () => {
    if (newTask.name && newTask.project && newTask.dueDate) {
      onSave({
        id: `task-${Date.now()}`,
        ...newTask,
        tags: newTask.tags || [],
        isCompleted: false,
      } as Task)
      setNewTask({
        name: "",
        project: "",
        dueDate: "",
        tags: [],
        priority: "中",
        department: "",
        status: "待办",
        description: "",
      })
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新建任务</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              任务名称
            </Label>
            <Input
              id="name"
              value={newTask.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project" className="text-right">
              项目
            </Label>
            <Input
              id="project"
              value={newTask.project}
              onChange={(e) => handleChange("project", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              截止日期
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={newTask.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              优先级
            </Label>
            <Select value={newTask.priority} onValueChange={(value) => handleChange("priority", value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择优先级" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="高">高</SelectItem>
                <SelectItem value="中">中</SelectItem>
                <SelectItem value="低">低</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="department" className="text-right">
              部门
            </Label>
            <Input
              id="department"
              value={newTask.department}
              onChange={(e) => handleChange("department", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="tags" className="text-right pt-2">
              标签
            </Label>
            <div className="col-span-3 space-y-2">
              <div className="flex flex-wrap gap-2">
                {newTask.tags?.map((tag) => {
                  const colors = getTagColors(tag)
                  return (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`flex items-center gap-1 ${colors.bg} ${colors.text} border ${colors.border}`}
                    >
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                    </Badge>
                  )
                })}
              </div>
              <div className="flex gap-2">
                <Input
                  id="newTag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="添加新标签"
                  onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                />
                <Button type="button" onClick={handleAddTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right pt-2">
              描述
            </Label>
            <Textarea
              id="description"
              value={newTask.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            创建
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

