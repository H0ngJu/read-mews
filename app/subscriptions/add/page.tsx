"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Plus, Search, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock popular newsletters
const popularNewsletters = [
  {
    id: 1,
    name: "한국경제 모닝브리핑",
    email: "morning@hankyung.com",
    category: "경제",
    description: "매일 아침 주요 경제 뉴스와 시장 동향을 간결하게 정리",
    subscribers: "15,000+",
    frequency: "매일",
  },
  {
    id: 2,
    name: "정치 인사이더",
    email: "insider@politics.com",
    category: "정치",
    description: "정치권 주요 이슈와 정책 변화를 심층 분석",
    subscribers: "8,500+",
    frequency: "주 3회",
  },
  {
    id: 3,
    name: "테크 트렌드 위클리",
    email: "weekly@techtrend.com",
    category: "시사",
    description: "최신 기술 동향과 스타트업 소식을 매주 정리",
    subscribers: "12,000+",
    frequency: "주 1회",
  },
  {
    id: 4,
    name: "글로벌 마켓 리포트",
    email: "global@market.com",
    category: "경제",
    description: "해외 증시와 환율, 원자재 시장 분석",
    subscribers: "6,200+",
    frequency: "매일",
  },
]

export default function AddSubscriptionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    description: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const filteredNewsletters = popularNewsletters.filter(
    (newsletter) =>
      newsletter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      newsletter.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleQuickAdd = (newsletter: any) => {
    setFormData({
      name: newsletter.name,
      email: newsletter.email,
      category: newsletter.category,
      description: newsletter.description,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setShowSuccess(true)

    // Redirect after success
    setTimeout(() => {
      router.push("/subscriptions")
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">구독이 완료되었습니다!</h3>
            <p className="text-gray-600 mb-4">{formData.name} 뉴스레터 구독이 성공적으로 추가되었습니다.</p>
            <Button onClick={() => router.push("/subscriptions")} className="w-full">
              구독 관리로 이동
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

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
              <h1 className="text-2xl font-bold text-gray-900">새 구독 추가</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Manual Add Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                직접 추가
              </CardTitle>
              <CardDescription>뉴스레터 정보를 직접 입력하여 구독을 추가하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">뉴스레터 이름 *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="예: 경제신문 뉴스레터"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">발신 이메일 주소 *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="예: newsletter@economy.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">카테고리</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">카테고리 선택</option>
                    <option value="경제">경제</option>
                    <option value="정치">정치</option>
                    <option value="시사">시사</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">설명</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="뉴스레터에 대한 간단한 설명을 입력하세요"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "구독 추가 중..." : "구독 추가"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Popular Newsletters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                인기 뉴스레터
              </CardTitle>
              <CardDescription>많은 사용자들이 구독하는 인기 뉴스레터를 확인해보세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="뉴스레터 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredNewsletters.map((newsletter) => (
                  <div key={newsletter.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{newsletter.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {newsletter.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{newsletter.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>구독자 {newsletter.subscribers}</span>
                      <span>{newsletter.frequency}</span>
                    </div>

                    <Button size="sm" variant="outline" onClick={() => handleQuickAdd(newsletter)} className="w-full">
                      <Mail className="h-4 w-4 mr-1" />
                      빠른 추가
                    </Button>
                  </div>
                ))}
              </div>

              {filteredNewsletters.length === 0 && (
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">검색 결과가 없습니다</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">💡 구독 추가 팁</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">이메일 주소 확인</h4>
                <p className="text-gray-600">
                  뉴스레터의 발신 이메일 주소를 정확히 입력해주세요. 보통 newsletter@, info@, news@ 등으로 시작합니다.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">카테고리 분류</h4>
                <p className="text-gray-600">
                  적절한 카테고리를 선택하면 분야별 요약에서 더 정확한 정보를 받아볼 수 있습니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
