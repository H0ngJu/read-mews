"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, Trophy } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const categoryQuizzes = {
  경제: {
    title: "경제 분야 종합 퀴즈",
    questions: [
      {
        id: 1,
        question: "한국은행의 기준금리 정책 목표는 무엇인가요?",
        options: ["물가 안정", "환율 안정", "주가 안정", "부동산 안정"],
        correct: 0,
        explanation: "한국은행의 주요 목표는 물가 안정을 통한 경제 안정입니다.",
      },
      {
        id: 2,
        question: "금리 인하 시 일반적으로 나타나는 현상은?",
        options: ["주식 하락", "원화 강세", "투자 활성화", "소비 위축"],
        correct: 2,
        explanation: "금리 인하는 자금 조달 비용을 낮춰 투자와 소비를 활성화시킵니다.",
      },
      {
        id: 3,
        question: "경제 성장률을 나타내는 지표는?",
        options: ["CPI", "GDP", "PPI", "M2"],
        correct: 1,
        explanation: "GDP(국내총생산)는 한 나라의 경제 규모와 성장률을 나타내는 대표적인 지표입니다.",
      },
    ],
  },
  정치: {
    title: "정치 분야 종합 퀴즈",
    questions: [
      {
        id: 1,
        question: "AI 규제법의 주요 목적은 무엇인가요?",
        options: ["AI 개발 금지", "AI 안전성 확보", "AI 수출 제한", "AI 특허 보호"],
        correct: 1,
        explanation: "AI 규제법은 AI 기술의 안전한 개발과 활용을 위한 법적 기반을 마련하는 것이 목적입니다.",
      },
      {
        id: 2,
        question: "국회에서 법안이 통과되기 위한 조건은?",
        options: ["단순 과반수", "3분의 2 이상", "만장일치", "대통령 동의"],
        correct: 0,
        explanation: "일반적인 법안은 재적의원 과반수 출석과 출석의원 과반수 찬성으로 통과됩니다.",
      },
      {
        id: 3,
        question: "정부 예산안을 최초로 심의하는 곳은?",
        options: ["국무회의", "국회", "감사원", "기획재정부"],
        correct: 1,
        explanation: "정부가 편성한 예산안은 국회에서 심의·확정됩니다.",
      },
    ],
  },
  시사: {
    title: "시사 분야 종합 퀴즈",
    questions: [
      {
        id: 1,
        question: "메타버스 기술의 핵심 요소가 아닌 것은?",
        options: ["가상현실", "증강현실", "블록체인", "2D 그래픽"],
        correct: 3,
        explanation: "메타버스는 3D 가상공간을 기반으로 하며, 2D 그래픽은 핵심 요소가 아닙니다.",
      },
      {
        id: 2,
        question: "반도체 시장에서 메모리 반도체의 대표적인 종류는?",
        options: ["CPU", "GPU", "DRAM", "SSD"],
        correct: 2,
        explanation: "DRAM은 대표적인 메모리 반도체로, 컴퓨터의 주기억장치로 사용됩니다.",
      },
      {
        id: 3,
        question: "K-컬처의 해외 확산에 가장 큰 영향을 미친 플랫폼은?",
        options: ["TV", "라디오", "OTT", "신문"],
        correct: 2,
        explanation: "넷플릭스 등 OTT 플랫폼을 통해 K-드라마, K-팝 등이 전 세계로 확산되었습니다.",
      },
    ],
  },
}

export default function CategoryQuizPage() {
  const params = useParams()
  const category = decodeURIComponent(params.category as string)
  const quiz = categoryQuizzes[category as keyof typeof categoryQuizzes]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">퀴즈를 찾을 수 없습니다</h3>
            <p className="text-gray-600 mb-4">해당 분야의 퀴즈가 준비되지 않았습니다.</p>
            <Link href="/">
              <Button>홈으로 돌아가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quiz.questions[index].correct ? 1 : 0)
    }, 0)
  }

  const score = calculateScore()
  const percentage = Math.round((score / quiz.questions.length) * 100)

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  홈으로
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle className="text-2xl">퀴즈 완료!</CardTitle>
              <CardDescription>
                {quiz.questions.length}문제 중 {score}문제를 맞혔습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">{percentage}%</div>
                <Progress value={percentage} className="w-full max-w-md mx-auto" />
              </div>

              <div className="space-y-4">
                {quiz.questions.map((question, index) => (
                  <Card key={question.id} className="text-left">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {selectedAnswers[index] === question.correct ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">{question.question}</p>
                          <p className="text-sm text-gray-600 mb-2">정답: {question.options[question.correct]}</p>
                          <p className="text-sm text-gray-500">{question.explanation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-4 justify-center mt-8">
                <Link href="/">
                  <Button variant="outline">홈으로 돌아가기</Button>
                </Link>
                <Button onClick={() => window.location.reload()}>다시 풀기</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const question = quiz.questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                뒤로가기
              </Button>
            </Link>
            <Badge variant="secondary">
              {currentQuestion + 1} / {quiz.questions.length}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
          <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="w-full" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                  className="w-full justify-start text-left h-auto p-4"
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className="mr-3 font-semibold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                이전
              </Button>
              <Button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === quiz.questions.length - 1 ? "결과 보기" : "다음"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
