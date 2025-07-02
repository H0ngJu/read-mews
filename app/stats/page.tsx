"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, TrendingUp, Brain, BookmarkIcon, Clock, Award, Target } from "lucide-react"
import Link from "next/link"

const weeklyStats = {
  totalRead: 24,
  totalTime: 78, // minutes
  quizzesTaken: 18,
  averageScore: 87,
  savedArticles: 6,
  categories: [
    { name: "경제", count: 12, percentage: 50, color: "bg-blue-500" },
    { name: "정치", count: 7, percentage: 29, color: "bg-green-500" },
    { name: "시사", count: 5, percentage: 21, color: "bg-purple-500" },
  ],
  dailyActivity: [
    { day: "월", read: 4, quizzes: 3 },
    { day: "화", read: 3, quizzes: 2 },
    { day: "수", read: 5, quizzes: 4 },
    { day: "목", read: 2, quizzes: 1 },
    { day: "금", read: 6, quizzes: 5 },
    { day: "토", read: 2, quizzes: 2 },
    { day: "일", read: 2, quizzes: 1 },
  ],
}

const monthlyStats = {
  totalRead: 96,
  totalTime: 312, // minutes
  quizzesTaken: 72,
  averageScore: 85,
  savedArticles: 23,
  categories: [
    { name: "경제", count: 45, percentage: 47, color: "bg-blue-500" },
    { name: "정치", count: 32, percentage: 33, color: "bg-green-500" },
    { name: "시사", count: 19, percentage: 20, color: "bg-purple-500" },
  ],
  achievements: [
    { title: "뉴스 마니아", description: "한 달에 100개 이상 뉴스 읽기", completed: false, progress: 96 },
    { title: "퀴즈 마스터", description: "퀴즈 정답률 90% 달성", completed: false, progress: 85 },
    { title: "꾸준한 학습자", description: "7일 연속 뉴스 읽기", completed: true, progress: 100 },
    { title: "분야별 전문가", description: "모든 분야에서 10개 이상 뉴스 읽기", completed: true, progress: 100 },
  ],
}

export default function StatsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const currentStats = selectedPeriod === "week" ? weeklyStats : monthlyStats

  const maxDailyRead = Math.max(...weeklyStats.dailyActivity.map((d) => d.read))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  뒤로가기
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">통계 리포트</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period Selector */}
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="week">이번 주</TabsTrigger>
            <TabsTrigger value="month">이번 달</TabsTrigger>
          </TabsList>

          <TabsContent value="week" className="space-y-8">
            {/* Weekly Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">읽은 뉴스</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.totalRead}개</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">읽기 시간</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.totalTime}분</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Brain className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">퀴즈 정답률</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.averageScore}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <BookmarkIcon className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">저장한 뉴스</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.savedArticles}개</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle>일별 활동</CardTitle>
                <CardDescription>이번 주 뉴스 읽기와 퀴즈 참여 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between space-x-2 border-b border-gray-200 pb-4">
                  {weeklyStats.dailyActivity.map((day, index) => (
                    <div key={day.day} className="flex flex-col items-center space-y-2 flex-1">
                      <div className="flex flex-col items-center space-y-1 h-48 justify-end">
                        {/* 읽은 뉴스 바 */}
                        <div
                          className="w-8 bg-blue-600 rounded-t-sm relative group"
                          style={{ height: `${(day.read / maxDailyRead) * 120}px` }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                            {day.read}
                          </div>
                        </div>
                        {/* 퀴즈 바 */}
                        <div
                          className="w-8 bg-purple-600 rounded-t-sm relative group"
                          style={{ height: `${(day.quizzes / maxDailyRead) * 120}px` }}
                        >
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                            {day.quizzes}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-gray-600">{day.day}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span>읽은 뉴스</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                    <span>퀴즈 참여</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="month" className="space-y-8">
            {/* Monthly Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">읽은 뉴스</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.totalRead}개</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">읽기 시간</p>
                      <p className="text-2xl font-bold text-gray-900">{Math.floor(currentStats.totalTime / 60)}시간</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Brain className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">퀴즈 정답률</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.averageScore}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <BookmarkIcon className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">저장한 뉴스</p>
                      <p className="text-2xl font-bold text-gray-900">{currentStats.savedArticles}개</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  성취도
                </CardTitle>
                <CardDescription>이번 달 달성한 목표들을 확인해보세요</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyStats.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {achievement.completed ? (
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Award className="h-4 w-4 text-green-600" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <Target className="h-4 w-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                          {achievement.completed && <Badge className="bg-green-100 text-green-800">완료</Badge>}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <Progress value={achievement.progress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">{achievement.progress}% 달성</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>분야별 뉴스 소비</CardTitle>
            <CardDescription>
              {selectedPeriod === "week" ? "이번 주" : "이번 달"} 어떤 분야의 뉴스를 많이 읽었는지 확인해보세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-48 h-48">
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  {currentStats.categories.map((category, index) => {
                    const startAngle = currentStats.categories
                      .slice(0, index)
                      .reduce((sum, cat) => sum + cat.percentage * 3.6, 0)
                    const endAngle = startAngle + category.percentage * 3.6
                    const largeArcFlag = category.percentage > 50 ? 1 : 0
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

                    const colors = ["#3b82f6", "#10b981", "#8b5cf6"]

                    return (
                      <path
                        key={category.name}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                        fill={colors[index]}
                        className="hover:opacity-80 transition-opacity"
                      />
                    )
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{currentStats.totalRead}</div>
                    <div className="text-sm text-gray-600">총 뉴스</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentStats.categories.map((category, index) => {
                const colors = ["bg-blue-600", "bg-green-600", "bg-purple-600"]
                return (
                  <div key={category.name} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-4 h-4 rounded-full ${colors[index]}`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{category.name}</div>
                      <div className="text-sm text-gray-600">
                        {category.count}개 ({category.percentage}%)
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
