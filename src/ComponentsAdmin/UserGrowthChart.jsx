import { Bar } from 'react-chartjs-2';
import { Chart, LinearScale, BarElement, CategoryScale } from 'chart.js';

Chart.register(LinearScale, BarElement, CategoryScale);

import { useTotalPorMes } from '../Hooks/useTotalPorMes';

const UserGrowthChart = ({ data }) => {
  const { organizaTotalPorMes } = useTotalPorMes();
  const totalCadastradoPorMes = organizaTotalPorMes(data);

  const chartData = {
    labels: totalCadastradoPorMes.map((item) => item.mes), // Use 'mes' em vez de 'month'
    datasets: [
      {
        data: totalCadastradoPorMes.map((item) => item.total),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Meses',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total de usuários',
        },
        ticks: {
          stepSize: 1, // Garante que mostre valores inteiros
        },
      },
    },
  };

  return (
    <div
      style={{
        height: '350px',
        width: '70%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '10px',
      }}
    >
      <h5 style={{ textAlign: 'start' }}>
        Gráfico de crescimento dos usuários
      </h5>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default UserGrowthChart;
