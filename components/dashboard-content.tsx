"use client"

import { useState } from "react"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Plus, Calendar, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toast"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { taskSchema, type Task } from "@/lib/schema"

// 模拟数据
const chartData = [
  { name: "周一", 能量: 40, 行动: 24, 情感: 60 },
  { name: "周二", 能量: 30, 行动: 13, 情感: 70 },
  { name: "周三", 能量: 20, 行动: 98, 情感: 50 },
  { name: "周四", 能量: 27, 行动: 39, 情感: 40 },
  { name: "周五", 能量: 18, 行动: 48, 情感: 30 },
  { name: "周六", 能量: 23, 行动: 38, 情感: 80 },
  { name: "周日", 能量: 34, 行动: 43, 情感: 70 },
]

const carouselItems = [
  { title: "生活管理", description: "管理日常生活的各个方面", icon: Calendar },
  { title: "能量管理", description: "跟踪和优化你的能量水平", icon: BarChart3 },
  { title: "行动管理", description: "计划和执行你的行动", icon: Plus },
]

export function DashboardContent() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const form = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      category: "daily",
    },
  })

  function onSubmit(data: Task) {
    toast.success("任务已创建", {
      description: `${data.title} 已添加到您的任务列表`,
    })
    form.reset()
    setIsDrawerOpen(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">仪表板</h1>
        <div className="flex items-center gap-2">
          <DatePicker date={selectedDate} onChange={setSelectedDate} className="w-[240px]" />
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                添加任务
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>创建新任务</DrawerTitle>
                <DrawerDescription>添加一个新任务到您的管理系统</DrawerDescription>
              </DrawerHeader>
              <div className="px-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>标题</FormLabel>
                          <FormControl>
                            <Input placeholder="输入任务标题" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>描述</FormLabel>
                          <FormControl>
                            <Textarea placeholder="输入任务描述" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>优先级</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择优先级" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="low">低</SelectItem>
                                <SelectItem value="medium">中</SelectItem>
                                <SelectItem value="high">高</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>分类</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="选择分类" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="daily">日常生活</SelectItem>
                                <SelectItem value="work">工作</SelectItem>
                                <SelectItem value="personal">个人发展</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DrawerFooter>
                      <Button type="submit">创建任务</Button>
                    </DrawerFooter>
                  </form>
                </Form>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="analytics">分析</TabsTrigger>
          <TabsTrigger value="features">功能</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <ResizablePanelGroup direction="horizontal" className="min-h-[500px] rounded-lg border">
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>今日概览</CardTitle>
                    <CardDescription>
                      {selectedDate ? format(selectedDate, "yyyy年MM月dd日") : "今天"} 的活动和任务
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="task">今日任务</Label>
                        <Input id="task" placeholder="添加新任务..." />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="note">今日笔记</Label>
                        <Textarea id="note" placeholder="记录今天的想法..." />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">保存</Button>
                  </CardFooter>
                </Card>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <Card className="w-full h-full">
                  <CardHeader>
                    <CardTitle>数据统计</CardTitle>
                    <CardDescription>过去一周的数据趋势</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="能量" fill="#8884d8" />
                        <Bar dataKey="行动" fill="#82ca9d" />
                        <Bar dataKey="情感" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>详细分析</CardTitle>
              <CardDescription>查看您的详细数据分析</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="能量" fill="#8884d8" />
                  <Bar dataKey="行动" fill="#82ca9d" />
                  <Bar dataKey="情感" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>功能展示</CardTitle>
              <CardDescription>探索系统的主要功能</CardDescription>
            </CardHeader>
            <CardContent className="px-2 py-6">
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {carouselItems.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex flex-col items-center justify-center p-6">
                            <item.icon className="h-12 w-12 mb-4 text-primary" />
                            <div className="text-center">
                              <h3 className="text-lg font-medium">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}

