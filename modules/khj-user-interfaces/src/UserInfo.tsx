import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export default function UserInfo() {
  const WeekDates = useMemo(() => {
    const curr = new Date();
    const first = curr.getDate() - curr.getDay();

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(curr.setDate(first + i));
      return `${(day.getMonth() + 1).toString().padStart(2, "0")}/${day.getDate().toString().padStart(2, "0")}`;
    });
  }, []);

  const solvedData = useMemo(() => {
    return [2, 3, 0, 4, 2, 5, 3];
  }, []);

  const chartData = useMemo(() => {
    return {
      labels: WeekDates,
      datasets: [
        {
          data: solvedData,
          borderColor: "#86AFF9",
          pointBackgroundColor: "#256ef4",
          pointBorderColor: "#256ef4",
          pointRadius: 9,
          pointHoverRadius: 8,
        },
      ],
    };
  }, [WeekDates, solvedData]);

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {},
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 12,
        ticks: {
          stepSize: 2,
          color: "#1E2124",
          font: {
            size: 24,
            weight: 700,
          },
        },
        grid: {
          color: "#8A949E",
          lineWidth: 2,
        },
        border: {
          dash: [10, 10],
          width: 2,
          color: "#8A949E",
        },
      },
      x: {
        offset: true,
        ticks: {
          color: function (context) {
            const index = context.index;
            if (index === 0) {
              return "#DE3412";
            } else if (index === 6) {
              return "#0B78CB";
            }

            return "#464C53";
          },
          font: {
            family: "Pretendard GOV",
            weight: 700,
            size: 24,
          },
        },
        grid: {
          display: true,
          color: "#8A949E",
          lineWidth: 2,
        },
        border: {
          dash: [10, 10],
          width: 2,
          color: "#8A949E",
        },
      },
    },
  };

  return (
    <Wrapper>
      <ChartWrapper>
        <Name>1310 전재준</Name>
        <Day>D+ 9</Day>

        <ChartInnerContainer>
          <Line data={chartData} options={chartOptions} />
        </ChartInnerContainer>
        <DividerLine />
        <CountList>
          {solvedData.map((count, index) => (
            <Count key={WeekDates[index]}>{count}개</Count>
          ))}
        </CountList>
      </ChartWrapper>
      <SidebarWrapper>
        <Box>
          <p>백준 ID</p>
          <span>jaejun090210</span>
        </Box>
        <Box>
          <p>Solved.ac 랭크</p>
          <span>다이아2</span>
        </Box>
        <TotalBox>
          <p>Total</p>
          <span>1000개</span>
          <p>Today</p>
          <span>10개</span>
        </TotalBox>
        <Box>
          <p>정답률</p>
          <span>99%</span>
        </Box>
        <ComebackBox>
          <ComebackList to="/list">리스트로 돌아가기</ComebackList>
        </ComebackBox>
      </SidebarWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 30px;

  position: relative;

  width: 1200px;
  height: 852px;
`;

const ChartWrapper = styled.div`
  position: relative;
  width: 930px;
  height: 852px;

  padding-top: 20px;

  background: #fafafa;
  box-shadow:
    0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
`;

const Name = styled.div`
  position: absolute;
  width: 200px;
  height: 36px;
  left: 35px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;

  color: #131416;
`;

const Day = styled.div`
  position: absolute;
  width: 135px;
  height: 36px;
  right: 39px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  text-align: right;

  color: #131416;
`;

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 31px;

  width: 240px;
  height: 849px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  gap: 20px;

  width: 240px;
  height: 130px;

  background: #fafafa;
  box-shadow:
    0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  color: #131416;

  p {
    width: 200px;
    height: 36px;
  }
  span {
    width: 200px;
    height: 36px;
    text-align: center;
  }
`;

const TotalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  gap: 20px;

  width: 240px;
  height: 235px;

  background: #fafafa;
  box-shadow:
    0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 150%;
  color: #131416;

  p {
    width: 200px;
    height: 36px;
  }
  span {
    width: 200px;
    height: 36px;
    text-align: center;
  }
`;

const ComebackBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  gap: 15px;

  width: 240px;
  height: 100px;

  background: #fafafa;
  box-shadow:
    0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
`;

const ComebackList = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;

  width: 200px;
  min-width: 90px;
  height: 50px;

  background: #256ef4;
  border-radius: 8px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  line-height: 150%;
  text-decoration: none;

  color: #ffffff;

  cursor: pointer;
`;

const ChartInnerContainer = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 100px;
  padding: 0 40px;
`;

const DividerLine = styled.div`
  width: 800px;
  height: 2px;
  background-color: #8a949e;
  margin-top: 11px;
  margin-left: 78px;
`;

const CountList = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 45px;

  width: 800px;
  height: 42px;

  margin-top: 10px;
  margin-left: 78px;
  padding-left: 20px;
  padding-bottom: 6px;

  border-bottom: 2px solid #8a949e;
`;

const Count = styled.div`
  width: 70px;
  height: 36px;

  font-family: "Pretendard GOV";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 150%;
  text-align: center;

  color: #131416;
`;
