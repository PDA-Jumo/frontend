const testData = [
    {
      question: "1. 회원님의 연령대는 어떻게 되시나요?",
      answers: [
        { text: "1. 19세 이하", point: 4 },
        { text: "2. 20세~29세", point: 3 },
        { text: "3. 30~39세", point: 2 },
        { text: "4. 40세~49세", point: 1 },
        { text: "5. 50세 이상", point: 0 }
      ]
    },
    {
      question: "2. 회원님의 연간 소득은 어떻게 되시나요?",
      answers: [
        { text: "1. 현재 고정소득이 없어요", point: 0 },
        { text: "2. 2천만원 이하", point: 1 },
        { text: "3. 2천만원 초과 5천만원 이하", point: 2 },
        { text: "4. 5천만원 초과 1억원 이하", point: 3 },
        { text: "5. 1억원 이상", point: 4 }
      ]
    },
    {
      question: "3. 회원님의 자산 중, 금융 자산은 어느정도 비율인가요?",
      answers: [
        { text: "1. 10% 이하", point: 0 },
        { text: "2. 10% 초과 20% 이하", point: 1 },
        { text: "3. 20% 초과 30% 이하", point: 2 },
        { text: "4. 30% 초과 40% 이하", point: 3 },
        { text: "5. 40% 초과", point: 4 }
      ]
    },
    {
      question: "4. 회원님이 감당할 수 있는 위험 수준은 어느 정도인가요?",
      answers: [
        { text: "1. 원금 손실은 절대 용납할 수 없어요", point: 0 },
        { text: "2. 최대한 손실이 발생하지 않으면 좋겠어요", point: 1 },
        { text: "3. 10% 내외의 변동성은 견딜 수 있어요", point: 2 },
        { text: "4. 30% 정도까진 기다리거나, 추가 매수할 의향도 있어요", point: 3 },
        { text: "5. 기대수익이 크다면 어떤 위험도 감수할래요", point: 4 }
      ]
    },
    {
      question: "5. 회원님의 금융 지식은 어느 정도라고 생각하나요?",
      answers: [
        { text: "1. 예금 제외 금융 상품에 대해 전혀 알지 못해요", point: 0 },
        { text: "2. 주식, 펀드같은 일반적인 상품에 대해 들어만 봤어요", point: 1 },
        { text: "3. 주식, 펀드같은 일반적인 상품에 투자하고 있어요", point: 2 },
        { text: "4. 파생상품 등 고난도 상품에 대해서도 들어 봤어요", point: 3 },
        { text: "5. 추가적인 설명이 없어도 대부분 상품에 스스로 투자할 수 있어요", point: 4 }
      ]
    },
    {
      question: "6. 예금을 제외한 금융 상품 투자기간이 얼마나 되시나요?",
      answers: [
        { text: "1. 투자 경험이 없어요", point: 0 },
        { text: "2. 6개월 이하", point: 1 },
        { text: "3. 6개월 초과 1년 이하", point: 2 },
        { text: "4. 1년 초과 3년 이하", point: 3 },
        { text: "5. 3년 이상", point: 4 }
      ]
    },
    {
      question: "7. 자금의 투자 기간은 얼마정도로 생각하시나요?",
      answers: [
        { text: "1. 1년 이하", point: 4 },
        { text: "2. 1년 초과 3년 이하", point: 3 },
        { text: "3. 3년 초과 5년 이하", point: 2 },
        { text: "4. 5년 초과 10년 이하", point: 1 },
        { text: "5. 10년 이상의 장기간", point: 0 }
      ]
    }
  ];
  
  export default testData;
  