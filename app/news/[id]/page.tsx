"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { BookmarkIcon, Clock, ArrowLeft, Share2, Brain, MessageSquare, Send, Lightbulb, Save } from "lucide-react"
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

// Mock notes data
const mockNotes = [
  {
    id: 1,
    content: "기준금리 인하가 부동산 시장에 미치는 영향을 더 자세히 알아봐야겠다.",
    timestamp: "2024-12-07 14:30",
    aiResponse: null,
  },
  {
    id: 2,
    content: "김경제 박사의 다른 경제 전망도 찾아보자",
    timestamp: "2024-12-07 14:32",
    aiResponse: null,
  },
]

export default function NewsDetailPage() {
  const params = useParams()
  const [saved, setSaved] = useState(mockArticle.saved)
  const [notes, setNotes] = useState(mockNotes)
  const [newNote, setNewNote] = useState("")
  const [aiQuestion, setAiQuestion] = useState("")
  const [isAskingAI, setIsAskingAI] = useState(false)
  const [showNotes, setShowNotes] = useState(false)

  const handleSaveNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now(),
        content: newNote,
        timestamp: new Date().toLocaleString("ko-KR"),
        aiResponse: null,
      }
      setNotes([...notes, note])
      setNewNote("")
    }
  }

  const handleAskAI = async (noteId?: number) => {
    if (!aiQuestion.trim()) return

    setIsAskingAI(true)

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const aiResponse = `기준금리 인하는 일반적으로 다음과 같은 영향을 미칩니다:

1. **부동산 시장**: 대출 금리 하락으로 주택 구매력 증가, 부동산 가격 상승 압력
2. **주식 시장**: 기업 자금 조달 비용 감소로 주가 상승 요인
3. **예금자**: 예금 금리 하락으로 수익률 감소
4. **경제 전반**: 소비와 투자 활성화를 통한 경기 부양 효과

다만 현재 상황에서는 부동산 과열 우려와 인플레이션 압력도 함께 고려해야 합니다.`

    if (noteId) {
      setNotes(notes.map((note) => (note.id === noteId ? { ...note, aiResponse } : note)))
    } else {
      const note = {
        id: Date.now(),
        content: aiQuestion,
        timestamp: new Date().toLocaleString("ko-KR"),
        aiResponse,
      }
      setNotes([...notes, note])
    }

    setAiQuestion("")
    setIsAskingAI(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                뒤로가기
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant={showNotes ? "default" : "ghost"} size="sm" onClick={() => setShowNotes(!showNotes)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                메모 ({notes.length})
              </Button>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {mockArticle.category}
                  </Badge>
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
                    <p className="text-gray-600">이 뉴스에 대한 퀴즈를 풀고 학습해보세요.</p>
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

          {/* Notes Sidebar */}
          <div className={`lg:col-span-1 ${showNotes ? "block" : "hidden lg:block"}`}>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  메모 & AI 질문
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Note */}
                <div className="space-y-2">
                  <Textarea
                    placeholder="메모를 작성하세요..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleSaveNote} size="sm" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    메모 저장
                  </Button>
                </div>

                {/* AI Question */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <Lightbulb className="h-4 w-4 mr-1" />
                    AI에게 질문하기
                  </div>
                  <Input
                    placeholder="궁금한 것을 질문해보세요..."
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAskAI()}
                  />
                  <Button onClick={() => handleAskAI()} size="sm" className="w-full" disabled={isAskingAI}>
                    <Send className="h-4 w-4 mr-2" />
                    {isAskingAI ? "답변 생성 중..." : "질문하기"}
                  </Button>
                </div>

                {/* Notes List */}
                <div className="border-t pt-4 space-y-3 max-h-96 overflow-y-auto">
                  {notes.map((note) => (
                    <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-800 mb-2">{note.content}</p>
                      <p className="text-xs text-gray-500 mb-2">{note.timestamp}</p>

                      {note.aiResponse && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                          <div className="flex items-center text-xs font-medium text-blue-700 mb-2">
                            <Lightbulb className="h-3 w-3 mr-1" />
                            AI 답변
                          </div>
                          <p className="text-sm text-blue-800 whitespace-pre-line">{note.aiResponse}</p>
                        </div>
                      )}
                    </div>
                  ))}

                  {notes.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">아직 메모가 없습니다.</p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <Link href="/notes">
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      모든 메모 보기
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
