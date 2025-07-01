"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookmarkIcon, Clock, Search, ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"

const mockSavedNews = [
  {
    id: 2,
    title: "AI 규제법안 국회 통과, 기업들 대응 방안 마련 중",
    summary:
      "인공지능 개발과 활용에 대한 규제 법안이 국회를 통과했습니다. 주요 IT 기업들은 새로운 규제에 맞춘 컴플라이언스 체계 구축에 나서고 있습니다.",
    category: "정치",
    source: "정치뉴스 다이제스트",
    readTime: "4분",
    publishedAt: "4시간 전",
    savedAt: "2시간 전",
    tags: ["AI", "규제", "국회", "IT"],
  },
  {
    id: 5,
    title: "원화 강세 지속, 수출기업 실적 우려",
    summary:
      "원달러 환율이 1,300원대 초반까지 하락하며 원화 강세가 지속되고 있습니다. 수출 의존도가 높은 기업들의 실적에 부정적 영향이 우려됩니다.",
    category: "경제",
    source: "경제신문 뉴스레터",
    readTime: "3분",
    publishedAt: "1일 전",
    savedAt: "1일 전",
    tags: ["환율", "원화", "수출", "실적"],
  },
]

export default function SavedNewsPage() {
  const [savedNews, setSavedNews] = useState(mockSavedNews)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredNews = savedNews.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const removeSaved = (id: number) => {
    setSavedNews(savedNews.filter((article) => article.id !== id))
  }

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
              <h1 className="text-2xl font-bold text-gray-900">저장된 뉴스</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="저장된 뉴스 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookmarkIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 저장된 뉴스</p>
                  <p className="text-2xl font-bold text-gray-900">{savedNews.length}개</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved News List */}
        {filteredNews.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <BookmarkIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? "검색 결과가 없습니다" : "저장된 뉴스가 없습니다"}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? "다른 키워드로 검색해보세요" : "관심있는 뉴스를 저장해보세요"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredNews.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{article.source}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{article.savedAt} 저장</span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>

                      <p className="text-gray-600 mb-3 line-clamp-2">{article.summary}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSaved(article.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Link href={`/news/${article.id}`}>
                      <Button size="sm" variant="outline">
                        읽기
                      </Button>
                    </Link>
                    <Link href={`/quiz/${article.id}`}>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        퀴즈
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
