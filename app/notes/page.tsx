"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, MessageSquare, Lightbulb, Calendar, FileText, Trash2, Eye } from "lucide-react"
import Link from "next/link"

// Mock notes data
const mockNotes = [
  {
    id: 1,
    content: "기준금리 인하가 부동산 시장에 미치는 영향을 더 자세히 알아봐야겠다.",
    timestamp: "2024-12-07 14:30",
    newsTitle: "2024년 4분기 경제 전망: 금리 인하 가능성 높아져",
    newsId: 1,
    category: "경제",
    aiResponse:
      "기준금리 인하는 일반적으로 다음과 같은 영향을 미칩니다:\n\n1. **부동산 시장**: 대출 금리 하락으로 주택 구매력 증가, 부동산 가격 상승 압력\n2. **주식 시장**: 기업 자금 조달 비용 감소로 주가 상승 요인\n3. **예금자**: 예금 금리 하락으로 수익률 감소\n4. **경제 전반**: 소비와 투자 활성화를 통한 경기 부양 효과",
  },
  {
    id: 2,
    content: "김경제 박사의 다른 경제 전망도 찾아보자",
    timestamp: "2024-12-07 14:32",
    newsTitle: "2024년 4분기 경제 전망: 금리 인하 가능성 높아져",
    newsId: 1,
    category: "경제",
    aiResponse: null,
  },
  {
    id: 3,
    content: "AI 규제법이 스타트업에 미치는 구체적인 영향이 궁금하다",
    timestamp: "2024-12-07 10:15",
    newsTitle: "AI 규제법안 국회 통과, 기업들 대응 방안 마련 중",
    newsId: 2,
    category: "정치",
    aiResponse:
      "AI 규제법이 스타트업에 미치는 주요 영향:\n\n1. **컴플라이언스 비용**: 규제 준수를 위한 추가 비용 발생\n2. **개발 속도**: 규제 검토 과정으로 인한 제품 출시 지연 가능성\n3. **투자 유치**: 규제 리스크로 인한 투자자 신중함 증가\n4. **경쟁력**: 대기업 대비 규제 대응 역량 부족으로 경쟁 불리",
  },
  {
    id: 4,
    content: "반도체 시장 회복이 삼성전자 주가에 미치는 영향 분석해보기",
    timestamp: "2024-12-06 16:20",
    newsTitle: "글로벌 반도체 시장 회복세, 국내 기업 수혜 전망",
    newsId: 3,
    category: "시사",
    aiResponse: null,
  },
  {
    id: 5,
    content: "메타버스 기술이 교육 분야에 어떻게 적용될 수 있을까?",
    timestamp: "2024-12-06 09:45",
    newsTitle: "메타버스 기술 발전과 새로운 비즈니스 기회",
    newsId: 5,
    category: "시사",
    aiResponse:
      "메타버스 기술의 교육 분야 적용 방안:\n\n1. **가상 교실**: 원격 수업의 몰입감 증대\n2. **실습 교육**: 위험하거나 비용이 많이 드는 실습을 가상으로 체험\n3. **역사 교육**: 과거 사건이나 장소를 3D로 재현하여 체험 학습\n4. **언어 교육**: 가상 환경에서 원어민과 대화 연습\n5. **협업 학습**: 전 세계 학생들과 가상 공간에서 프로젝트 수행",
  },
]

export default function NotesPage() {
  const [notes, setNotes] = useState(mockNotes)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("전체")
  const [activeTab, setActiveTab] = useState("all")

  const categories = ["전체", "경제", "정치", "시사"]

  const getFilteredNotes = () => {
    let filtered = notes

    // Tab filter
    if (activeTab === "ai") {
      filtered = filtered.filter((note) => note.aiResponse)
    } else if (activeTab === "recent") {
      filtered = filtered.slice(0, 10) // Recent 10 notes
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (note) =>
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.newsTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (note.aiResponse && note.aiResponse.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategory !== "전체") {
      filtered = filtered.filter((note) => note.category === selectedCategory)
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "경제":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "정치":
        return "bg-green-50 text-green-700 border-green-200"
      case "시사":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "IT":
        return "bg-orange-50 text-orange-700 border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const filteredNotes = getFilteredNotes()

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
              <h1 className="text-2xl font-bold text-gray-900">내 메모</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">총 메모</p>
                  <p className="text-2xl font-bold text-gray-900">{notes.length}개</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Lightbulb className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">AI 답변</p>
                  <p className="text-2xl font-bold text-gray-900">{notes.filter((n) => n.aiResponse).length}개</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">이번 주 메모</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      notes.filter((n) => {
                        const noteDate = new Date(n.timestamp)
                        const weekAgo = new Date()
                        weekAgo.setDate(weekAgo.getDate() - 7)
                        return noteDate > weekAgo
                      }).length
                    }
                    개
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="ai">AI 답변</TabsTrigger>
            <TabsTrigger value="recent">최근</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="메모 검색..."
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

        {/* Notes List */}
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className={getCategoryColor(note.category)}>
                        {note.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{note.timestamp}</span>
                    </div>

                    <h3 className="font-medium text-gray-900 mb-2">{note.content}</h3>

                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <FileText className="h-4 w-4 mr-1" />
                      <span className="truncate">{note.newsTitle}</span>
                    </div>

                    {note.aiResponse && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-3">
                        <div className="flex items-center text-sm font-medium text-blue-700 mb-2">
                          <Lightbulb className="h-4 w-4 mr-1" />
                          AI 답변
                        </div>
                        <p className="text-sm text-blue-800 whitespace-pre-line line-clamp-3">{note.aiResponse}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Link href={`/news/${note.newsId}`}>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNote(note.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || selectedCategory !== "전체" ? "검색 결과가 없습니다" : "메모가 없습니다"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedCategory !== "전체"
                  ? "다른 조건으로 검색해보세요"
                  : "뉴스를 읽으면서 메모를 작성해보세요"}
              </p>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700">뉴스 읽으러 가기</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
