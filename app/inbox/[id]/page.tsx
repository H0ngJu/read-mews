"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, Archive, Trash2, Reply, Forward, BookmarkIcon, Brain } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const mockEmail = {
  id: 1,
  subject: "2024년 4분기 경제 전망: 금리 인하 가능성 높아져",
  sender: "경제신문 뉴스레터",
  senderEmail: "newsletter@economy.com",
  category: "경제",
  receivedAt: "2024년 12월 7일 오전 9:30",
  isStarred: true,
  content: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
        📈 2024년 4분기 경제 전망
      </h2>
      
      <p>안녕하세요, 경제신문 구독자 여러분!</p>
      
      <p>오늘은 한국은행의 기준금리 정책 방향과 4분기 경제 전망에 대해 말씀드리겠습니다.</p>
      
      <h3 style="color: #1f2937; margin-top: 30px;">🏦 한국은행 기준금리 인하 검토</h3>
      <p>한국은행이 기준금리 인하를 적극 검토하고 있는 것으로 알려졌습니다. 주요 배경은 다음과 같습니다:</p>
      
      <ul style="background-color: #f9fafb; padding: 20px; border-left: 4px solid #3b82f6;">
        <li><strong>물가 안정세:</strong> 소비자물가 상승률이 목표치인 2%대로 안정화</li>
        <li><strong>경기 둔화:</strong> 내수 부진과 수출 감소로 경기 둔화 우려 지속</li>
        <li><strong>글로벌 요인:</strong> 미국 연준의 통화정책 변화와 중국 경제 둔화</li>
      </ul>
      
      <h3 style="color: #1f2937; margin-top: 30px;">📊 전문가 의견</h3>
      <blockquote style="background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; font-style: italic;">
        "현재 경제 상황을 고려할 때 연내 기준금리 0.25%p 인하가 불가피할 것으로 보입니다. 
        다만 부동산 시장 과열 우려도 함께 고려해야 합니다."
        <br><br>
        - 김경제 박사, 한국경제연구원
      </blockquote>
      
      <h3 style="color: #1f2937; margin-top: 30px;">📈 시장 반응 전망</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
        <div style="background-color: #ecfdf5; padding: 15px; border-radius: 8px;">
          <h4 style="color: #059669; margin: 0 0 10px 0;">긍정적 영향</h4>
          <ul style="margin: 0; padding-left: 20px;">
            <li>주식시장 상승 기대</li>
            <li>기업 투자 활성화</li>
            <li>소비 심리 개선</li>
          </ul>
        </div>
        <div style="background-color: #fef2f2; padding: 15px; border-radius: 8px;">
          <h4 style="color: #dc2626; margin: 0 0 10px 0;">우려 요인</h4>
          <ul style="margin: 0; padding-left: 20px;">
            <li>부동산 가격 상승 압력</li>
            <li>가계부채 증가 우려</li>
            <li>원화 약세 가능성</li>
          </ul>
        </div>
      </div>
      
      <h3 style="color: #1f2937; margin-top: 30px;">🔮 향후 일정</h3>
      <p>한국은행은 다음 달 <strong>12월 14일</strong> 금융통화위원회에서 최종 결정을 내릴 예정입니다. 
      시장에서는 이번 회의에서 기준금리가 현재 3.50%에서 3.25%로 인하될 가능성이 높다고 보고 있습니다.</p>
      
      <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <h4 style="color: #1d4ed8; margin: 0 0 10px 0;">💡 투자자 유의사항</h4>
        <p style="margin: 0;">금리 인하는 단기적으로 주식시장에 긍정적이지만, 장기적으로는 경제 펀더멘털을 
        면밀히 살펴보시기 바랍니다. 특히 부동산 투자 시에는 정부 정책 변화도 함께 고려하시길 권합니다.</p>
      </div>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
      
      <p style="font-size: 14px; color: #6b7280;">
        이 뉴스레터가 도움이 되셨나요? 
        <a href="#" style="color: #2563eb;">피드백을 남겨주세요</a> | 
        <a href="#" style="color: #2563eb;">구독 해지</a>
      </p>
      
      <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
        경제신문 뉴스레터 | newsletter@economy.com<br>
        서울시 중구 세종대로 124 | 구독자 15,000명
      </p>
    </div>
  `,
}

export default function EmailDetailPage() {
  const params = useParams()
  const [isStarred, setIsStarred] = useState(mockEmail.isStarred)
  const [isSaved, setIsSaved] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/inbox">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                수신함으로
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setIsStarred(!isStarred)}>
                <Star className={`h-4 w-4 ${isStarred ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsSaved(!isSaved)}>
                <BookmarkIcon className={`h-4 w-4 ${isSaved ? "fill-blue-600 text-blue-600" : "text-gray-400"}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Archive className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Email Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">{mockEmail.category}</Badge>
              <span className="text-sm text-gray-500">{mockEmail.receivedAt}</span>
            </div>
            <CardTitle className="text-2xl font-bold leading-tight mb-2">{mockEmail.subject}</CardTitle>
            <CardDescription className="flex items-center justify-between">
              <div>
                <span className="font-medium">{mockEmail.sender}</span>
                <span className="text-gray-500 ml-2">&lt;{mockEmail.senderEmail}&gt;</span>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Email Content */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div dangerouslySetInnerHTML={{ __html: mockEmail.content }} />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline">
            <Reply className="h-4 w-4 mr-2" />
            답장
          </Button>
          <Button variant="outline">
            <Forward className="h-4 w-4 mr-2" />
            전달
          </Button>
          <Link href={`/quiz/${params.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Brain className="h-4 w-4 mr-2" />
              퀴즈 풀기
            </Button>
          </Link>
        </div>

        {/* Related Actions */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">이 뉴스에 대해 더 알아보세요!</h3>
              <p className="text-gray-600 mb-4">퀴즈를 통해 내용을 정리하고 포인트도 획득하세요.</p>
              <div className="flex gap-4 justify-center">
                <Link href={`/quiz/${params.id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Brain className="h-4 w-4 mr-2" />
                    퀴즈 시작하기
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setIsSaved(!isSaved)}>
                  <BookmarkIcon className="h-4 w-4 mr-2" />
                  {isSaved ? "저장됨" : "나중에 읽기"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
