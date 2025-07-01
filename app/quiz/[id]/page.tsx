"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle, XCircle, Trophy } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const mockQuiz = {
  title: "2024년 4분기 경제 전망 퀴즈",
  questions: [
    {
      id: 1,
      question: "한국은행이 검토 중인 기준금리 인하폭은 얼마인가요?",
      options: ["0.25%p", "0.5%p", "0.75%p", "1.0%p"],
      correct: 0,
      explanation: "전문가들은 연내 0.25%p 인하 가능성을 제기했습니다.",
    },
    {
      id: 2,
      question: "금리 인하의 주요 배경이 아닌 것은?",
      options: ["물가 안정세", "경기 둔화", "글로벌 불확실성", "수출 급증"],
      correct: 3,
      explanation: "수출 급증은 금리 인하의 배경이 아닙니다. 물가 안정세와 경기 둔화가 주요 요인입니다.",
    },
    {
      id: 3,
      question: "금리 인하 시 예상되는 시장 반응으로 옳은 것은?",
      options: ["주식시장 하락", "채권 금리 상승", "부동산 대출 수요 증가", "원화 강세"],
      correct: 2,
      explanation: "금리 인하 시 대출 비용이 낮아져 부동산 대출 수요가 증가할 것으로 예상됩니다.",
    },
  ],
}

export default function QuizPage() {
  const params = useParams()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < mockQuiz.questions.length - 1) {
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
      return score + (answer === mockQuiz.questions[index].correct ? 1 : 0)
    }, 0)
  }

  const score = calculateScore()
  const percentage = Math.round((score / mockQuiz.questions.length) * 100)
  const earnedPoints = score * 50

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
                {mockQuiz.questions.length}문제 중 {score}문제를 맞혔습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">{percentage}%</div>
                <Progress value={percentage} className="w-full max-w-md mx-auto" />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 font-semibold">+{earnedPoints} 포인트 획득!</p>
              </div>

              <div className="space-y-4">
                {mockQuiz.questions.map((question, index) => (
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
                <Link href={`/news/${params.id}`}>
                  <Button>뉴스 다시 읽기</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const question = mockQuiz.questions[currentQuestion]

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
              {currentQuestion + 1} / {mockQuiz.questions.length}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{mockQuiz.title}</h1>
          <Progress value={((currentQuestion + 1) / mockQuiz.questions.length) * 100} className="w-full" />
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
                {currentQuestion === mockQuiz.questions.length - 1 ? "결과 보기" : "다음"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
