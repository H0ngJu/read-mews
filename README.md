# 📬 read-mews

[서비스 바로가기](https://v0-customized-news-app.vercel.app/)

메일로 구독 중인 뉴스레터를 하나의 플랫폼에서 통합 관리하고, 관심사 기반으로 간결한 뉴스 요약과 퀴즈로 학습까지 할 수 있는 개인 맞춤형 뉴스 요약 서비스입니다.

---

## 🎯 서비스 핵심 가치

✅ **구독 뉴스레터 통합 관리**  
메일함에 흩어진 뉴스레터를 한 플랫폼에서 모아 관리 피로도를 줄입니다.

✅ **관심 맞춤형 요약 제공**  
설정한 관심 키워드를 기반으로 주요 뉴스를 핵심만 간결하게 제공합니다.

✅ **퀴즈 기반 상호작용**  
하루 이슈를 간단한 퀴즈로 복습하며 이해도를 점검하고 리워드를 적립합니다.

✅ **깔끔한 아카이빙**  
뉴스를 저장하고 태그/검색 기능을 통해 쉽게 다시 찾아볼 수 있습니다.

---

## 📌 기존 구독형 메일과의 차별점

- 메일로 구독의 장점은 유지하면서 메일함이 뉴스로 뒤섞여 관리가 어려운 문제를 해결합니다.
- 일반 뉴스 앱은 기사 원문을 보여주지만, 본 서비스는 메일 뉴스레터를 **통합 관리**하고 \*\*관심사 📌 왜 기존 모바일 뉴스 앱과 다른가?
  메일로 구독의 장점은 유지하면서 메일함에 구독 메일, 업무 메일, 깃허브 등의 알림이 섞여 관리가 어려운 문제를 해결합니다.

구독 해지를 하려면 개별적으로 관리해야 하는 번거로움을 줄이고, 한곳에서 손쉽게 구독 상태를 관리할 수 있습니다.

관심 있는 뉴스레터를 구독하기 위해 여기저기 찾아다닐 필요 없이 플랫폼 내에서 원하는 뉴스 소스를 검색·구독할 수 있습니다.

구독 상태를 한눈에 파악하고 필요에 따라 활성/비활성/삭제 등 구독 관리 기능을 통합적으로 제공합니다.

뉴스레터를 제대로 읽었는지 파악하기 어려운 문제를 해결하고, 퀴즈 기능으로 뉴스 이해도를 점검할 수 있습니다.

키워드 기반 검색으로 예전 뉴스레터를 빠르게 찾아볼 수 있어 효율적인 아카이빙이 가능합니다.맞춤 요약\*\*을 제공한다는 점에서 차별화됩니다.

- 뉴스 이해도를 높이는 **퀴즈 기반 상호작용**과 리워드로 사용자의 뉴스 소비 동기를 강화합니다.

---

## 🛠 주요 기능

- 📌 **구독 현황 관리**

  - 이메일 연동으로 구독 뉴스레터 자동 리스트업
  - 구독 상태 관리(활성/비활성/삭제), 알림 설정

- 🗂 **분야별 요약 피드**

  - 뉴스레터를 시사/경제/정치 등으로 자동 분류
  - 핵심 뉴스 3~5개를 카드 형태로 요약 제공

- 🔍 **키워드 맞춤 뉴스**

  - 관심 키워드를 등록하고 해당 키워드 기반으로 뉴스 피드를 개인화

- 📝 **퀴즈 생성 기능**

  - 요약된 뉴스에서 객관식/주관식 문제를 자동 생성

- 💾 **뉴스 저장·검색**

  - 관심 있는 뉴스를 저장하고 키워드, 분야, 날짜별로 검색 가능

- 🔔 **푸시 알림**

  - 매일 아침 관심 키워드 기반 뉴스 알림 발송
  - 주요 속보 알림 제공

- 🎁 **리워드 시스템**

  - 퀴즈 참여와 뉴스 소비 활동에 따라 포인트 적립

- 📊 **구독 통계 리포트**

  - 주간/월간 단위로 읽은 뉴스와 관심 분야 통계 제공

- 📤 **공유 기능**
  - SNS/이메일로 요약 뉴스 공유

---

## 🗓 사용자 시나리오 예시

### 메일 구독 관리와 분야별 뉴스 확인

- 내 구독 관리 페이지에서 현재 등록된 뉴스레터와 구독 상태(활성/비활성/삭제)를 관리
- 홈 화면에서 카테고리별 핵심 뉴스 카드로 빠르게 이슈 파악

### 퇴근길 뉴스 요약 & 퀴즈

- 20분 남짓한 이동 시간 동안 오늘의 주요 뉴스 요약 확인
- 뉴스 이해도를 퀴즈로 점검하고 맞힌 개수에 따라 리워드 적립

---

## ✅ 인수 조건

| Given                              | When                     | Then                                 |
| ---------------------------------- | ------------------------ | ------------------------------------ |
| 사용자가 관심 키워드를 등록했을 때 | 매일 오전 7시            | 등록 키워드 기반 뉴스 요약 알림 발송 |
| 사용자가 퀴즈를 선택했을 때        | 퀴즈를 완료하면          | 맞힌 개수와 해설 제공, 리워드 적립   |
| 사용자가 특정 뉴스를 저장했을 때   | 저장 버튼을 누르면       | 내 저장함에 해당 뉴스 등록           |
| 사용자가 구독 관리에 접속했을 때   | 뉴스레터 상태를 변경하면 | 알림/구독 상태가 즉시 반영           |

---

## 🚀 구현 로드맵

### 1차 (MVP)

- 이메일 연동 후 뉴스레터 자동 리스트업
- 구독 관리 UI 구현
- 분야별 뉴스 요약 카드 목업
- 뉴스 저장 기능

### 2차

- 실제 뉴스 자동 요약 알고리즘
- 분야별 뉴스 기반 퀴즈 생성
- 키워드 기반 개인화 피드
- 주간/월간 뉴스 통계 제공

### 3차

- 뉴스 검색/필터링 기능
- AI 기반 관심 뉴스 추천
- SNS/이메일 공유 기능
- 다국어 뉴스 소스 연동
- 분야별/시간대 맞춤 알림

---

## 🔗 관련 링크

- [서비스 데모 사이트](https://v0-customized-news-app.vercel.app/)
- [GitHub Repository](https://github.com/H0ngJu/read-mews?tab=readme-ov-file)
