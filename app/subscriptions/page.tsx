"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Search, Mail, Plus, Settings, Trash2, Bell, BellOff } from "lucide-react"
import Link from "next/link"

const mockSubscriptions = [
  {
    id: 1,
    name: "경제신문 뉴스레터",
    email: "newsletter@economy.com",
    category: "경제",
    frequency: "매일",
    isActive: true,
    hasNotification: true,
    subscribedAt: "2024-01-15",
    lastReceived: "2시간 전",
    totalEmails: 156,
    description: "국내외 경제 동향과 시장 분석을 매일 아침 전달",
  },
  {
    id: 2,
    name: "정치뉴스 다이제스트",
    email: "digest@politics.com",
    category: "정치",
    frequency: "주 3회",
    isActive: true,
    hasNotification: false,
    subscribedAt: "2024-02-01",
    lastReceived: "1일 전",
    totalEmails: 89,
    description: "주요 정치 이슈와 정책 변화를 간결하게 요약",
  },
  {
    id: 3,
    name: "테크 인사이트",
    email: "tech@insights.com",
    category: "시사",
    frequency: "주 2회",
    isActive: false,
    hasNotification: true,
    subscribedAt: "2023-12-10",
    lastReceived: "1주 전",
    totalEmails: 67,
    description: "최신 기술 트렌드와 스타트업 소식",
  },
  {
    id: 4,
    name: "글로벌 마켓 리포트",
    email: "market@global.com",
    category: "경제",
    frequency: "매일",
    isActive: true,
    hasNotification: true,
    subscribedAt: "2024-01-20",
    lastReceived: "4시간 전",
    totalEmails: 134,
    description: "해외 주식시장과 환율 동향 분석",
  },
  {
    id: 5,
    name: "사회이슈 브리핑",
    email: "social@brief.com",
    category: "시사",
    frequency: "주 1회",
    isActive: true,
    hasNotification: false,
    subscribedAt: "2024-03-01",
    lastReceived: "3일 전",
    totalEmails: 23,
    description: "주요 사회 이슈와 문화 트렌드 정리",
  },
]

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")

  const categories = ["전체", "경제", "정치", "시사"]

  const filteredSubscriptions = subscriptions.filter((sub) => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "전체" || sub.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleActive = (id: number) => {
    setSubscriptions(subscriptions.map((sub) => (sub.id === id ? { ...sub, isActive: !sub.isActive } : sub)))
  }

  const toggleNotification = (id: number) => {
    setSubscriptions(
      subscriptions.map((sub) => (sub.id === id ? { ...sub, hasNotification: !sub.hasNotification } : sub)),
    )
  }

  const removeSubscription = (id: number) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id))
  }

  const activeCount = subscriptions.filter((sub) => sub.isActive).length
  const totalEmails = subscriptions.reduce((sum, sub) => sum + sub.totalEmails, 0)

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
              <h1 className="text-2xl font-bold text-gray-900">구독 관리</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/inbox">
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  수신함
                </Button>
              </Link>
              <Link href="/subscriptions/add">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />새 구독 추가
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">활성 구독</p>
                  <p className="text-2xl font-bold text-gray-900">{activeCount}개</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Settings className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">전체 구독</p>
                  <p className="text-2xl font-bold text-gray-900">{subscriptions.length}개</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Bell className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 수신 메일</p>
                  <p className="text-2xl font-bold text-gray-900">{totalEmails}개</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="구독 뉴스레터 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Subscriptions List */}
        <div className="space-y-4">
          {filteredSubscriptions.map((subscription) => (
            <Card key={subscription.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{subscription.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {subscription.category}
                      </Badge>
                      {subscription.isActive ? (
                        <Badge className="bg-green-100 text-green-800 text-xs">활성</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">
                          일시중지
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 mb-3">{subscription.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">발송 주기:</span>
                        <br />
                        {subscription.frequency}
                      </div>
                      <div>
                        <span className="font-medium">구독일:</span>
                        <br />
                        {subscription.subscribedAt}
                      </div>
                      <div>
                        <span className="font-medium">최근 수신:</span>
                        <br />
                        {subscription.lastReceived}
                      </div>
                      <div>
                        <span className="font-medium">총 메일:</span>
                        <br />
                        {subscription.totalEmails}개
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 ml-6">
                    <div className="flex items-center gap-2">
                      <Switch checked={subscription.isActive} onCheckedChange={() => toggleActive(subscription.id)} />
                      <span className="text-sm text-gray-600">활성화</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleNotification(subscription.id)}
                        className="p-2"
                      >
                        {subscription.hasNotification ? (
                          <Bell className="h-4 w-4 text-blue-600" />
                        ) : (
                          <BellOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSubscription(subscription.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSubscriptions.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "검색 결과가 없습니다" : "구독 중인 뉴스레터가 없습니다"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? "다른 키워드로 검색해보세요" : "새로운 뉴스레터를 구독해보세요"}
              </p>
              <Link href="/subscriptions/add">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />새 구독 추가
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
