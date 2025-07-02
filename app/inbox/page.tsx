"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Mail, MailOpen, Archive, Trash2, Star, Clock, RefreshCw, Eye } from "lucide-react"
import Link from "next/link"

// Mock email data
const mockEmails = [
  {
    id: 1,
    subject: "2024년 4분기 경제 전망: 금리 인하 가능성 높아져",
    sender: "경제신문 뉴스레터",
    senderEmail: "newsletter@economy.com",
    category: "경제",
    receivedAt: "2시간 전",
    isRead: false,
    isStarred: true,
    isArchived: false,
    preview:
      "한국은행이 기준금리 인하를 검토 중이며, 전문가들은 연내 0.25%p 인하 가능성을 제기했습니다. 물가 안정세와 경기 둔화가 주요 요인으로 분석됩니다...",
    hasAttachment: false,
  },
  {
    id: 2,
    subject: "AI 규제법안 국회 통과, 기업들 대응 방안 마련 중",
    sender: "정치뉴스 다이제스트",
    senderEmail: "digest@politics.com",
    category: "정치",
    receivedAt: "4시간 전",
    isRead: true,
    isStarred: false,
    isArchived: false,
    preview:
      "인공지능 개발과 활용에 대한 규제 법안이 국회를 통과했습니다. 주요 IT 기업들은 새로운 규제에 맞춘 컴플라이언스 체계 구축에 나서고 있습니다...",
    hasAttachment: true,
  },
  {
    id: 3,
    subject: "글로벌 반도체 시장 회복세, 국내 기업 수혜 전망",
    sender: "테크 인사이트",
    senderEmail: "tech@insights.com",
    category: "시사",
    receivedAt: "6시간 전",
    isRead: true,
    isStarred: false,
    isArchived: false,
    preview:
      "글로벌 반도체 시장이 회복세를 보이며 삼성전자, SK하이닉스 등 국내 메모리 반도체 기업들의 실적 개선이 기대됩니다...",
    hasAttachment: false,
  },
  {
    id: 4,
    subject: "원화 강세 지속, 수출기업 실적 우려",
    sender: "글로벌 마켓 리포트",
    senderEmail: "market@global.com",
    category: "경제",
    receivedAt: "1일 전",
    isRead: false,
    isStarred: true,
    isArchived: false,
    preview:
      "원달러 환율이 1,300원대 초반까지 하락하며 원화 강세가 지속되고 있습니다. 수출 의존도가 높은 기업들의 실적에 부정적 영향이 우려됩니다...",
    hasAttachment: false,
  },
  {
    id: 5,
    subject: "메타버스 기술 발전과 새로운 비즈니스 기회",
    sender: "테크 인사이트",
    senderEmail: "tech@insights.com",
    category: "시사",
    receivedAt: "2일 전",
    isRead: true,
    isStarred: false,
    isArchived: true,
    preview:
      "메타버스 기술이 빠르게 발전하면서 새로운 비즈니스 기회들이 창출되고 있습니다. 특히 교육, 엔터테인먼트, 커머스 분야에서 혁신적인 서비스들이 등장하고 있습니다...",
    hasAttachment: true,
  },
]

export default function InboxPage() {
  const [emails, setEmails] = useState(mockEmails)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [activeTab, setActiveTab] = useState("all")

  const categories = ["전체", "경제", "정치", "시사"]

  const getFilteredEmails = () => {
    let filtered = emails

    // Tab filter
    if (activeTab === "unread") {
      filtered = filtered.filter((email) => !email.isRead)
    } else if (activeTab === "starred") {
      filtered = filtered.filter((email) => email.isStarred)
    } else if (activeTab === "archived") {
      filtered = filtered.filter((email) => email.isArchived)
    } else {
      filtered = filtered.filter((email) => !email.isArchived)
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (email) =>
          email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.preview.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "전체") {
      filtered = filtered.filter((email) => email.category === selectedCategory)
    }

    return filtered
  }

  const toggleRead = (id: number) => {
    setEmails(emails.map((email) => (email.id === id ? { ...email, isRead: !email.isRead } : email)))
  }

  const toggleStar = (id: number) => {
    setEmails(emails.map((email) => (email.id === id ? { ...email, isStarred: !email.isStarred } : email)))
  }

  const toggleArchive = (id: number) => {
    setEmails(emails.map((email) => (email.id === id ? { ...email, isArchived: !email.isArchived } : email)))
  }

  const deleteEmail = (id: number) => {
    setEmails(emails.filter((email) => email.id !== id))
  }

  const filteredEmails = getFilteredEmails()
  const unreadCount = emails.filter((email) => !email.isRead && !email.isArchived).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/subscriptions">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  뒤로가기
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">수신함</h1>
              {unreadCount > 0 && <Badge className="bg-red-100 text-red-800">{unreadCount}개 읽지 않음</Badge>}
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              새로고침
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="unread">읽지 않음</TabsTrigger>
            <TabsTrigger value="starred">중요</TabsTrigger>
            <TabsTrigger value="archived">보관함</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="메일 검색..."
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

        {/* Email List */}
        <div className="space-y-2">
          {filteredEmails.map((email) => (
            <Card
              key={email.id}
              className={`hover:shadow-md transition-shadow cursor-pointer ${
                !email.isRead ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleRead(email.id)
                      }}
                      className="p-1 h-6 w-6"
                    >
                      {email.isRead ? (
                        <MailOpen className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Mail className="h-4 w-4 text-blue-600" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleStar(email.id)
                      }}
                      className="p-1 h-6 w-6"
                    >
                      <Star
                        className={`h-4 w-4 ${email.isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
                      />
                    </Button>
                  </div>

                  {/* Email Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${!email.isRead ? "font-bold" : ""}`}>{email.sender}</span>
                        <Badge variant="outline" className="text-xs">
                          {email.category}
                        </Badge>
                        {email.hasAttachment && (
                          <Badge variant="secondary" className="text-xs">
                            첨부
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {email.receivedAt}
                      </div>
                    </div>

                    <h3 className={`text-lg mb-2 ${!email.isRead ? "font-bold text-gray-900" : "text-gray-800"}`}>
                      {email.subject}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{email.preview}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{email.senderEmail}</span>
                      <div className="flex space-x-2">
                        <Link href={`/inbox/${email.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            읽기
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleArchive(email.id)
                          }}
                        >
                          <Archive className="h-4 w-4 mr-1" />
                          {email.isArchived ? "복원" : "보관"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteEmail(email.id)
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEmails.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || selectedCategory !== "전체" ? "검색 결과가 없습니다" : "메일이 없습니다"}
              </h3>
              <p className="text-gray-500">
                {searchTerm || selectedCategory !== "전체"
                  ? "다른 조건으로 검색해보세요"
                  : "새로운 뉴스레터 메일을 기다리고 있습니다"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
