"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BookmarkIcon, Clock, TrendingUp, Brain, Search, Settings, Bell, Mail, BarChart3, Users } from "lucide-react"
import Link from "next/link"

// Mock data for news articles
const mockNews = [
  {
    id: 1,
    title: "2024년 4분기 경제 전망: 금리 인하 가능성 높아져",
    summary:
      "한국은행이 기준금리 인하를 검토 중이며, 전문가들은 연내 0.25%p 인하 가능성을 제기했습니다. 물가 안정세와 경기 둔화가 주요 요인으로 분석됩니다.",
    category: "경제",
    source: "경제신문 뉴스레터",
    readTime: "3분",
    publishedAt: "2시간 전",
    saved: false,
    tags: ["금리", "한국은행", "경제전망"],
  },
  {
    id: 2,
    title: "AI 규제법안 국회 통과, 기업들 대응 방안 마련 중",
    summary:
      "인공지능 개발과 활용에 대한 규제 법안이 국회를 통과했습니다. 주요 IT 기업들은 새로운 규제에 맞춘 컴플라이언스 체계 구축에 나서고 있습니다.",
    category: "정치",
    source: "정치뉴스 다이제스트",
    readTime: "4분",
    publishedAt: "4시간 전",
    saved: true,
    tags: ["AI", "규제", "국회", "IT"],
  },
  {
    id: 3,
    title: "글로벌 반도체 시장 회복세, 국내 기업 수혜 전망",
    summary:
      "글로벌 반도체 시장이 회복세를 보이며 삼성전자, SK하이닉스 등 국내 메모리 반도체 기업들의 실적 개선이 기대됩니다. 특히 AI 수요 증가가 주요 동력으로 작용하고 있습니다.",
    category: "시사",
    source: "테크 인사이트",
    readTime: "5분",
    publishedAt: "6시간 전",
    saved: false,
    tags: ["반도체", "삼성전자", "AI", "수출"],
  },
]

// Mock data for category summaries
const categorySummaries = [
  {
    category: "경제",
    title: "오늘의 경제 이슈",
    summary: "금리 인하 전망, 원화 강세, 반도체 시장 회복",
    newsCount: 8,
    keyPoints: ["기준금리 인하 검토", "원달러 환율 1,300원대", "반도체 수출 증가"],
  },
  {
    category: "정치",
    title: "오늘의 정치 이슈",
    summary: "AI 규제법 통과, 예산안 심의, 외교 현안",
    newsCount: 6,
    keyPoints: ["AI 규제법안 국회 통과", "2024년 예산안 논의", "한미 정상회담 준비"],
  },
  {
    category: "시사",
    title: "오늘의 시사 이슈",
    summary: "기술 혁신, 사회 이슈, 문화 트렌드",
    newsCount: 5,
    keyPoints: ["메타버스 기술 발전", "청년 주거 정책", "K-컬처 해외 확산"],
  },
]

export default function HomePage() {
  const [news, setNews] = useState(mockNews)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [activeTab, setActiveTab] = useState("summary")

  const categories = ["전체", "경제", "정치", "시사"]

  const filteredNews = news.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleSave = (id: number) => {
    setNews(news.map((article) => (article.id === id ? { ...article, saved: !article.saved } : article)))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">NewsHub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/subscriptions">
                <Button variant="ghost" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  구독 관리
                </Button>
              </Link>
              <Link href="/stats">
                <Button variant="ghost" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  통계
                </Button>
              </Link>
              <Link href="/saved">
                <Button variant="ghost" size="sm">
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">안녕하세요, 김지훈님!</h2>
          <p className="text-gray-600">오늘의 주요 뉴스를 확인하고 퀴즈로 학습해보세요.</p>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">분야별 요약</TabsTrigger>
            <TabsTrigger value="news">전체 뉴스</TabsTrigger>
          </TabsList>

          {/* Category Summary Tab */}
          <TabsContent value="summary" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categorySummaries.map((summary) => (
                <Card key={summary.category} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-center mb-2">
                      <Badge variant="outline" className="text-xs">
                        {summary.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {summary.newsCount}개 뉴스
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{summary.title}</CardTitle>
                    <CardDescription className="text-sm">{summary.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-gray-700">주요 포인트:</p>
                      <ul className="space-y-1">
                        {summary.keyPoints.map((point, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => {
                          setSelectedCategory(summary.category)
                          setActiveTab("news")
                        }}
                      >
                        전체 보기
                      </Button>
                      <Button size="sm" variant="outline">
                        <Brain className="h-4 w-4 mr-1" />
                        퀴즈
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* All News Tab */}
          <TabsContent value="news" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="뉴스 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
                <TabsList className="grid w-full grid-cols-4 sm:w-auto">
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="text-sm">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* News Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => toggleSave(article.id)} className="h-8 w-8 p-0">
                        <BookmarkIcon
                          className={`h-4 w-4 ${article.saved ? "fill-blue-600 text-blue-600" : "text-gray-400"}`}
                        />
                      </Button>
                    </div>
                    <CardTitle className="text-lg leading-tight line-clamp-2">{article.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      {article.source} • {article.publishedAt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">{article.summary}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/news/${article.id}`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            읽기
                          </Button>
                        </Link>
                        <Link href={`/quiz/${article.id}`}>
                          <Button size="sm" variant="outline">
                            <Brain className="h-4 w-4 mr-1" />
                            퀴즈
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">이번 주 읽은 뉴스</p>
                  <p className="text-2xl font-bold text-gray-900">24개</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">퀴즈 정답률</p>
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">구독 뉴스레터</p>
                  <p className="text-2xl font-bold text-gray-900">8개</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
