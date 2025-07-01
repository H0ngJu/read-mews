"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookmarkIcon, Clock, ArrowLeft, Share2, Brain } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const mockArticle = {
  id: 1,
  title: "2024년 4분기 경제 전망: 금리 인하 가능성 높아져",
  summary: "한국은행이 기준금리 인하를 검토 중이며, 전문가들은 연내 0.25%p 인하 가능성을 제기했습니다.",
  content: `
    한국은행이 기준금리 인하를 적극 검토하고 있는 것으로 알려졌습니다. 
    
    **주요 배경**
    - 물가 상승률이 목표치인 2%대로 안정화
    - 경기 둔화 우려가 지속되고 있음
    - 글로벌 경제 불확실성 증가
    
    **전문가 의견**
    경제연구원의 김경제 박사는 "현재 경제 상황을 고려할 때 연내 기준금리 인하가 불가피할 것"이라고 전망했습니다.
    
    **시장 반응**
    - 주식시장: 금융주를 중심으로 상승세
    - 채권시장: 장기 금리 하락
    - 부동산: 대출 수요 증가 예상
    
    **향후 전망**
    한국은행은 다음 달 금융통화위원회에서 최종 결정을 내릴 예정입니다.
  `,
  category: "경제",
  source: "경제신문 뉴스레터",
  readTime: "3분",
  publishedAt: "2시간 전",
  saved: false,
  tags: ["금리", "한국은행", "경제전망"],
}

export default function NewsDetailPage() {
  const params = useParams()
  const [saved, setSaved] = useState(mockArticle.saved)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                뒤로가기
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSaved(!saved)}>
                <BookmarkIcon className={`h-4 w-4 ${saved ? "fill-blue-600 text-blue-600" : "text-gray-400"}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{mockArticle.category}</Badge>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{mockArticle.source}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{mockArticle.publishedAt}</span>
            </div>
            <CardTitle className="text-3xl font-bold leading-tight mb-4">{mockArticle.title}</CardTitle>
            <CardDescription className="text-lg text-gray-600">{mockArticle.summary}</CardDescription>
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {mockArticle.readTime} 읽기
              </div>
              <div className="flex flex-wrap gap-1">
                {mockArticle.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              {mockArticle.content.split("\n").map((paragraph, index) => {
                if (paragraph.trim() === "") return null
                if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-gray-900">
                      {paragraph.replace(/\*\*/g, "")}
                    </h3>
                  )
                }
                if (paragraph.startsWith("- ")) {
                  return (
                    <li key={index} className="ml-4 mb-2 text-gray-700">
                      {paragraph.substring(2)}
                    </li>
                  )
                }
                return (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quiz CTA */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">이해도를 확인해보세요!</h3>
                <p className="text-gray-600">이 뉴스에 대한 퀴즈를 풀고 포인트를 획득하세요.</p>
              </div>
              <Link href={`/quiz/${params.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Brain className="h-4 w-4 mr-2" />
                  퀴즈 풀기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
