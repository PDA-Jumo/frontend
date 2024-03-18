// TODO 사용자 DB 나오면 문제에 레벨 달아보기. 사용자의 레벨보다 높은 문제는 출제되지 않도록 하기
const quizData = [
  {
    "type": "OX",
    "question": "주식 투자는 수익을 목적으로 하는 활동인가요?",
    "options": ["O", "X"],
    "answer": "O",
    "explanation": "네..?",
    "level": "1", // TODO: 이런 식으로 minLevel을 전부 설정해줄거임. 단순 노가다라 금방 할듯?
  },
  {
    "type": "OX",
    "question": "주식을, 24시간 내가 원할때 사고 팔 수 있나요?",
    "options": ["O", "X"],
    "answer": "X",
    "explanation": "주식 시장이 열렸을때만 거래가 가능해요."
  },
  {
    "type": "multipleChoice",
    "question": "주식을 매매한다에서, 매매는 무엇의 줄임말일까요?",
    "options": ["매수/매도", "매일/매매", "매번/매매", "매일/매일"],
    "answer": "매수/매도",
    "explanation": "매수(구매) 와 매도(판매) 로 구성돼요."
  },
  {
    "type": "multipleChoice",
    "question": "주식을 사기 위해 넣어둔 돈은 무엇일까요??",
    "options": ["예금", "예수금", "세금", "복권"],
    "answer": "예수금",
    "explanation": "증권사의 계좌에 보유하고 있는 투자 금액 = 예수금."
  },
  {
    "type": "multipleChoice",
    "question": "주식을 현재 가격에 바로 구매하고 싶으면 어떤 주문을 해야 할까??",
    "options": ["지정가 주문", "시장가 주문", "무조건 주문", "시간외 주문"],
    "answer": "시장가 주문",
    "explanation": "지정가: 정해진 가격에 주문"
  },
  {
    "type": "multipleChoice",
    "question": "주식을 원하는 가격에 구매하고 싶으면 어떤 주문을 해야 할까??",
    "options": ["지정가 주문", "시장가 주문", "무조건 주문", "시간외 주문"],
    "answer": "지정가 주문",
    "explanation": "시장가: 현재 가격에 바로 주문"
  },
  {
    "type": "multipleChoice",
    "question": "주식을 가지고 있는 사람을 뭐라고 할까?",
    "options": ["공모주", "신규상장주", "주주", "예금주"],
    "answer": "주주",
    "explanation": "공모주: 기업공개를 통해 신규 상장하는 주식을 의미해요."
  },
  {
    "type": "OX",
    "question": "모든 회사는 한국 증권시장에서 거래할 수 있을까?",
    "options": ["O", "X"],
    "answer": "X",
    "explanation": "주식회사만 거래할 수 있어요."
  },
  {
    "type": "OX",
    "question": "한국 증권시장에서, 주식의 가격은 하루에 무한정으로 오르고 내릴 수 있을까?",
    "options": ["O", "X"],
    "answer": "X",
    "explanation": "보통의 경우에는 상한가/하한가로 제한되어 있어요."
  },
  {
    "type": "OX",
    "question": "한국 증권시장에서 가장 규모가 큰 주식은 삼성전자이다",
    "options": ["O", "X"],
    "answer": "O",
    "explanation": "회사의 규모는 '시가총액' 으로 평가해요."
  },
  {
    "type": "OX",
    "question": "충분한 돈이 있다면, 무한정으로 주식을 살 수 있을까요?",
    "options": ["O", "X"],
    "answer": "X",
    "explanation": "주식을 팔려는 사람이 있어야 살 수 있어요."
  },
  {
    "type": "multipleChoice",
    "question": "한국 증권시장의 투자 주체가 아닌 것은?",
    "options": ["개인", "기관", "외국인", "외계인"],
    "answer": "외계인",
    "explanation": "외계인은 한국에 투자할 수 없어요."
  },
  {
    "type": "multipleChoice",
    "question": "주식을 주문하는 사람이 부르는 가격을 뜻하는 용어는?",
    "options": ["호가", "매매가", "시가", "종가"],
    "answer": "호가",
    "explanation": "투자자가 '이 가격에 살게요 혹은 팔게요' 를 정해 주문한 가격 = 호가"
  },
  {
    "type": "multipleChoice",
    "question": "한국 증권시장에서, 상한가와 하한가는 각 몇%일까?",
    "options": ["10%", "20%", "30%", "40%"],
    "answer": "30%",
    "explanation": "예외의 경우도 존재하지만, 보편적으로는 각 30%이에요."
  },
  {
    "type": "multipleChoice",
    "question": "증권시장에 있는 회사의 가치를 주가로 평가한 값은?",
    "options": ["배당수익률", "순이익", "시가총액", "액면가"],
    "answer": "시가총액",
    "explanation": "배당수익률: 배당금/주가*100, 액면가: '회계적으로 명시된' 주식 1주의 가격"
  },
  {
    "type": "multipleChoice",
    "question": "대한민국에서 가장 규모가 큰 제1증권시장의 이름은?",
    "options": ["코스피", "코스닥", "코넥스", "K-OTC"],
    "answer": "코스피",
    "explanation": "코스피>코스닥>코넥스>K-OTC의 규모에요."
  },
  {
    "type": "multipleChoice",
    "question": "주가가 어느 정도로 변동하는지를 나타내는 지표는?",
    "options": ["유동성", "시가총액", "거래량", "변동성"],
    "answer": "변동성",
    "explanation": "유동성: 자산을 가치의 손실 없이 얼마나 쉽고 빨리 현금으로 바꿀 수 있는가를 의미해요."
  },
  {
    "type": "multipleChoice",
    "question": "기업이 벌어들인 돈의 일부 혹은 전부를 주주들에게 돌려주는 것은?",
    "options": ["이익잉여금", "자본금", "배당", "영업이익"],
    "answer": "배당",
    "explanation": "기업은 배당을 통해 주주들에게 보상해요."
  },
  {
    "type": "OX",
    "question": "주식을 살 돈이 모자라요, 소숫점 단위로도 살 수 있나요?",
    "options": ["O", "X"],
    "answer": "O",
    "explanation": "2022년 9월 26일부터 국내 주식도 소수점 거래가 가능해요."
  },
  {
    "type": "multipleChoice",
    "question": "증권시장에 상장된 주식이 적격성을 잃고 시장에서 쫓겨나는 것은?",
    "options": ["투자경고", "상장폐지", "무상감자", "투자유의"],
    "answer": "상장폐지",
    "explanation": "상장된 거래소에서 퇴출당함을 의미해요."
  },
  {
    "type": "multipleChoice",
    "question": "여러 종목을 나누어 구매하여, 안정성을 높이는 투자법은?",
    "options": ["분산투자", "집중투자", "단기투자", "장기투자"],
    "answer": "분산투자",
    "explanation": "'계란을 한 바구니에 담지 마라'와 동일한 의미에요."
  },
  {
    "type": "OX",
    "question": "증권사에서 돈을 빌려서 주식을 살 수 있나요?",
    "options": ["O", "X"],
    "answer": "O",
    "explanation": "3일 내의 단기투자 목적엔, '미수'를 통해 증권사의 자본으로 주식 거래가 가능해요."
  },
  {
    "type": "OX",
    "question": "주가와 회사의 가치는 정비례하나요?",
    "options": ["O", "X"],
    "answer": "X",
    "explanation": "고평가, 저평가된 주식이라는 말이 존재하는 이유에요."
  },
  {
    "type": "OX",
    "question": "거래가 많이 되고 있는 종목은 무조건 주가가 오를까?",
    "options": ["O", "X"],
    "answer": "X",
    "explanation": "거래량이 반드시 주가 상승의 원인이 되지는 않아요."
  },
  {
    "type": "multipleChoice",
    "question": "주가 지수 등, 특정 지수를 추종하여 상장되어 있는 상품은?",
    "options": ["선물", "채권", "ETF", "예금"],
    "answer": "ETF",
    "explanation": "ETF는 기초 자산의 가격에 따라 가격이 결정되는 특징을 갖고 있어요."
  },
  {
    "type": "multipleChoice",
    "question": "현재의 기업 가치보다 미래 성장할 잠재력이 있는 회사의 주식은?",
    "options": ["성장주", "가치주", "배당주", "테마주"],
    "answer": "성장주",
    "explanation": "잠재력으로 인해, 기업의 가치에 비해 높은 평가를 받곤 해요."
  },
  {
    "type": "multipleChoice",
    "question": "보통 주식에 비해서 특정한 우선권이 부여되어 있는 주식은?",
    "options": ["우선주", "보통주", "전환주식", "대주주"],
    "answer": "우선주",
    "explanation": "배당금 및 회사 청산 시 보통주보다 우선해서 청산금을 받을 수 있어요."
  },
  {
    "type": "multipleChoice",
    "question": "경기상황에 큰 영향을 받지 않고 안정적인 실적을 올리며, 주가 변동에 상대적으로 안정적인 주식은?",
    "options": ["경기 방어주", "경기 순환주", "고배당주", "신성장주"],
    "answer": "경기 방어주",
    "explanation": "담배나 콜라처럼, 경기 상황과 상관없이 소비가 강요되는 특징을 가진 주식이에요."
  },
  {
    "type": "multipleChoice",
    "question": "증권시장에 새로운 주식을 상장하기 위해, 처음으로 불특정 외부 투자자들에게 주식을 공모하는 행위는?",
    "options": ["IPO(기업공개)", "PO(사모)", "CB(전환사채)", "BW(신주인수권부사채)"],
    "answer": "IPO(기업공개)",
    "explanation": "initial public offering. 즉 '최초로 대중에게 제안' 한다는 의미에요."
  },
  {
    "type": "OX",
    "question": "모든 주식은 30% 상/하한가의 적용을 받나요?",
    "options": ["O", "X"],
    "answer": "X",
    "explanation": "신규 상장주의 경우 공모가 60%~400%의 범위로 하루종일 움직여요."
  },
  {
    "type": "multipleChoice",
    "question": "보통 주식을 구매하면 주어지는 권리 두 가지를 옳게 짝지은 것은?",
    "options": ["의결권, 배당권", "매매권, 우선권", "신주인수권, 매도권", "전환권, 교환권"],
    "answer": "의결권, 배당권",
    "explanation": "우선주에는 보통 의결권이 없어요! 꼭 기억하세요."
  },
  {
    "type": "multipleChoice",
    "question": "주식의 가격이 갑작스럽게 상승 혹은 하락 시, 주가 보호를 위해 2분간 거래를 정지하고 단일 가격으로의 주문을 받는 장치는?",
    "options": ["변동성 완화장치(VI)", "거래 정지", "가격 제한 폭", "시장 조정"],
    "answer": "변동성 완화장치(VI)",
    "explanation": "전날 종가 기준 10% 이상 상승/하락시,혹은 직전호가 대비 2~6% 이상 변화 시 적용돼요."
  },
  {
    "type": "OX",
    "question": "증권 시장의 전체적인 지수가 폭락하면, 그날 장이 조기종료될 수도 있을까요?",
    "options": ["O", "X"],
    "answer": "O",
    "explanation": "서킷브레이커라는 제도에요."
  },
  {
    "type": "multipleChoice",
    "question": "매수호가에 체결된 주식 수를 매도호가에 체결된 주식 수로 나눈 비율은?",
    "options": ["체결강도", "거래비율", "매수우위", "매도우위"],
    "answer": "체결강도",
    "explanation": "주식을 매수하고자 하는 힘을 나타내는 값이에요."
  },
  {
    "type": "multipleChoice",
    "question": "증권시장에서 기업의 가치를 평가하기 위해 직접적으로 사용되는 지표가 아닌 것은?",
    "options": ["회사의 순이익", "회사의 순자산", "회사의 매출액", "회사의 직원 수"],
    "answer": "회사의 직원 수",
    "explanation": "직원 수는 직접적으로 활용되지 않아요."
  },
  {
    "type": "multipleChoice",
    "question": "기업이 주식 발행을 통해 추가 자금을 확보하는 과정으로, 새로운 주식을 발행하고 이를 매각하여 자금을 조달하는 것은?",
    "options": ["유상증자", "무상증자", "무상감자", "유상감자"],
    "answer": "유상증자",
    "explanation": "무상증자는 매각 없이 무상으로 기존 주주에게 주식을 제공하는 행위에요."
  },
  {
    "type": "multipleChoice",
    "question": "투자 결정 과정에서 재무적 요소와 더불어, 환경/사회/지배구조를 고려하는 투자는?",
    "options": ["ESG 투자", "가치 투자", "성장 투자", "모멘텀 투자"],
    "answer": "ESG 투자",
    "explanation": "Environment, society, governence의 약자에요."
  },
  {
    "type": "OX",
    "question": "기업공개 없이 회사가 증권시장에 상장할 수 있나요?",
    "options": ["O", "X"],
    "answer": "O",
    "explanation": "우회상장 등의 제도가 존재해요."
  },
  {
    "type": "multipleChoice",
    "question": "금융감독원에서 운영하며, 기업의 정보 및 지표를 공시하는 전자 시스템은?",
    "options": ["DART", "KIS", "KRX", "NICE"],
    "answer": "DART",
    "explanation": "전자공시시스템의 약자에요."
  },
  {
    "type": "multipleChoice",
    "question": "현재 주가를 주당 순이익으로 나눈 지표는?",
    "options": ["PER", "PBR", "PSR", "PCR"],
    "answer": "PER",
    "explanation": "Price / Earning Ratio"
  },
  {
    "type": "multipleChoice",
    "question": "현재 주가를 주당 순자산으로 나눈 지표는?",
    "options": ["PBR", "PER", "PSR", "PCR"],
    "answer": "PBR",
    "explanation": "Price / Book-value Ratio (Book: 총자산)"
  },
  {
    "type": "multipleChoice",
    "question": "현재 주가를 주당 매출액으로 나눈 지표는?",
    "options": ["PSR", "PBR", "PER", "PCR"],
    "answer": "PSR",
    "explanation": "Price / Sales Ratio"
  },
  {
    "type": "multipleChoice",
    "question": "일정 기간 동안 주가의 평균을 보여주어, 현재 주가의 상대적 위치를 비교할 수 있도록 하는 지표는?",
    "options": ["이동평균선", "볼린저 밴드", "RSI", "MACD"],
    "answer": "이동평균선",
    "explanation": "과거의 평균적인 수치에서 현상을 파악하여 매매에 도움을 줄 수 있어요."
  },
  {
    "type": "multipleChoice",
    "question": "초기 투자금 대비 거래한 금액의 비율을 의미하는 것은?",
    "options": ["매매회전율", "자본이익률", "수익률", "배당률"],
    "answer": "매매회전율",
    "explanation": "(최초 예수금 / 거래한 금액) * 100"
  },
  {
    "type": "multipleChoice",
    "question": "주식시장에 상장된 기업이 분기별로 실적을 발표하고, 이후 기업 운영의 전망을 내놓는 행사는?",
    "options": ["어닝 콜", "주주총회", "기업설명회", "분기보고회"],
    "answer": "어닝 콜",
    "explanation": "보도 자료 작성 및 배부, 애널리스트 미팅, Q&A 세션 등이 이루어져요."
  },
  {
    "type": "multipleChoice",
    "question": "기업의 매출과 이익 등, 기업이 발표하는 미래 실적에 대한 예상 전망치는?",
    "options": ["가이던스", "예측", "전망", "계획"],
    "answer": "가이던스",
    "explanation": "투자자들에게 회사의 장래를 예측하기 위한 길라잡이 역할을 해요."
  },
  {
    "type": "multipleChoice",
    "question": "소비자 관점에서의 상품 및 서비스 가격 변동이 얼마정도 발생하였는지 의미하는 값으로, 지수에 큰 영향을 끼치는 것은?",
    "options": ["CPI(소비자물가지수)", "GDP(국내총생산)", "PPI(생산자물가지수)", "인플레이션"],
    "answer": "CPI(소비자물가지수)",
    "explanation": "특히 미국의 CPI 발표일은, 전세계 투자자들이 주목하고 있어요."
  },
  {
    "type": "multipleChoice",
    "question": "미국의 중앙은행 시스템으로, 금융 시장과 경제에 큰 영향을 미치는 중요한 기관?",
    "options": ["CPI(소비자물가지수)", "FED(연방준비제도)", "PPI(생산자물가지수)", "인플레이션"],
    "answer": "FED(연방준비제도)",
    "explanation": "Don't Fight FED라는 명언이 있을 정도에요."
  },
  {
    "type": "multipleChoice",
    "question": "현재 주가가 고평가되었다고 판단하여, 주가의 하락에 베팅하는 투자 기법은??",
    "options": ["장기투자", "프로그램 매매", "추격매수", "공매도"],
    "answer": "공매도",
    "explanation": "주식을 빌려서 미리 팔고, 주가가 내렸을 때 사서 빌린 주식을 갚는 방식이에요."
  },
  {
    "type": "multipleChoice",
    "question": "내가 가진 돈보다 더 많은 자본을 투입하여 수익을 극대화할 수 있는 방법은?",
    "options": ["레버리지", "폰지", "다단계", "헷지"],
    "answer": "레버리지",
    "explanation": "내 자본금을 바탕으로 더 많은 외부 자금을 투입하여 투자하는 것을 의미해요."
  },
  {
    "type": "multipleChoice",
    "question": "몇 분, 빠르면 몇 초 안에 팔아서 적은 규모의 시세차익을 노리는 투자 기법은?",
    "options": ["스윙", "스캘핑", "데이 트레이딩", "추세 트레이딩"],
    "answer": "스캘핑",
    "explanation": "스윙/데이 트레이딩: 하루~한 달의 주기로 매매를 진행해요."
  },
  {
    "type": "multipleChoice",
    "question": "신용 및 미수 거래에서, 담보로 넣은 금액보다 주식의 가치가 더 떨어져서 증권사에서 강제로 내 주식을 매도하는 상황은?",
    "options": ["손절매", "역매매", "반대매매", "담보거래"],
    "answer": "반대매매",
    "explanation": "강제로 주식을 매도해도 담보금을 메꿀 수 없으면, 그대로 빚으로 돌아와요."
  },
  {
    "type": "OX",
    "question": "종가와 시가가 같다는 것은 거래일 동안 주가에 변동이 없었다는 의미인가요?",
    "options": ["O", "X"],
    "answer": "X",
    "explanation": "종가와 시가가 같다고 해서 반드시 주가에 변동이 없는 것은 아닙니다."
  },
  {
    "type": "OX",
    "question": "과거의 주가 움직임을 토대로 미래의 주가 방향을 정확히 예측할 수 있나요?",
    "options": ["O", "X"],
    "answer": "X",
    "explanation": "주가의 움직임은 다양한 요인에 영향을 받기 때문에, 미래를 정확히 예측할 순 없어요."
  },
  {
    "type": "multipleChoice",
    "question": "이동평균선을 기반으로 하는 기술적 분석 지표는 무엇인가요?",
    "options": ["MACD", "RSI", "볼린저 밴드", "거래량"],
    "answer": "MACD",
    "explanation": "이동평균수렴확산(MACD)은 이동평균선을 기반으로 하는 분석 지표에요."
  },
  {
    "type": "multipleChoice",
    "question": "ROE(자기자본이익률)이 높은 기업은 어떤 특징을 가졌을 확률이 높나요?",
    "options": ["자금의 효율적 사용", "부채 위험 증가", "매출 감소", "임금 상승"],
    "answer": "자금의 효율적 사용",
    "explanation": "ROE가 높을수록 기업은 효율적으로 자금을 활용하고 있음을 나타냅니다."
  },
  {
    "type": "multipleChoice",
    "question": "한 기업의 주당 순이익(EPS)이 4000원이고, 해당 기업의 주가가 20배의 P/E 비율을 가질 때, 주식의 현재 가격은 얼마인가요?",
    "options": ["60000원", "80000원", "100000원", "120000원"],
    "answer": "80000원",
    "explanation": "P/E 비율은 주가를 주당 순이익으로 나눈 값이에요."
  },
  {
    "type": "multipleChoice",
    "question": "배당 수익률이 5%인 주식에서 1주당 배당금이 200원일 때, 해당 주식의 가격은 얼마인가요?",
    "options": ["3000원", "4000원", "1000원", "2000원"],
    "answer": "4000원",
    "explanation": "배당 수익률은 배당금/주가이므로, 5%/200원 = 4000원이 됩니다."
  },
 {
    "type": "OX",
    "question": "'기술적 분석'은 주식의 가치에 대한 분석을 중점적으로 진행하나요?. (O/X)",
    "options": ["O", "X"],
    "answer": "X",
    "explanation": "주식 가격의 패턴과 트렌드를 분석하여 향후 가격을 예측하는 방법이에요."
  },
 {
  "type": "multipleChoice",
  "question": "내 주식의 가격이 20% 상승했어요. 매수 수수료가 2%, 매도 수수료가 1%라면,실질 수익률은 얼마인가요?",
  "options": ["16.8%", "17%", "18%", "19%"],
  "answer": "16.8%",
  "explanation": "20% - 2% - 1% = 17%가 아니라, 수수료를 고려한 수익률 계산을 통해 16.8%가 돼요."
  },
 { 
  "type": "multipleChoice",
  "question": "배당금이 전년 대비 10% 증가했고, 현재 주식의 배당 수익률이 6%일 때, 주식 가격의 변동률은 어떻게 되나요?",
  "options": ["증가했다", "감소했다", "변동이 없다", "정보가 부족하다"],
  "answer": "정보가 부족하다",
  "explanation": "배당금의 증가율만으로는 주식 가격의 변동률을 알 수 없어요."
  },
 {
    "type": "multipleChoice",
    "question": "기업의 실적보다는 시장의 감정에 따라 주식을 매매하는 전략을 무엇이라 부르나요?",
    "options": ["가치 투자", "성장 투자", "모멘텀 투자", "밸류 투자"],
    "answer": "모멘텀 투자",
    "explanation": "모멘텀은 가격 상승세나 하락세의 양상이에요."
  },
  {
    "type": "OX",
    "question": "시가총액은 주식의 질을 결정하는 유일한 지표인가요?",
    "options": ["O", "X"],
    "answer": "X",
    "explanation": "시가총액은 회사의 수준이나 건전성을 전적으로 반영하지는 않아요."
  },
];

export default quizData;