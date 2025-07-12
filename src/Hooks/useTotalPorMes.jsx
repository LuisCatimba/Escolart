export const useTotalPorMes = () => {
  const organizaTotalPorMes = (data) => {
    const TotalPorMes = [
      { mes: "Jan", total: 2 },
      { mes: "Fev", total: 3 },
      { mes: "Mar", total: 0 },
      { mes: "Abr", total: 5 },
      { mes: "Mai", total: 4 },
      { mes: "Jun", total: 1 },
      { mes: "Jul", total: 2 },
      { mes: "Ago", total: 1 },
      { mes: "Set", total: 2 },
      { mes: "Out", total: 1 },
      { mes: "Nov", total: 3 },
      { mes: "Dez", total: 1 },
    ];

    data.map((item) => {
      TotalPorMes[item.month].total += 1;
    });
    return TotalPorMes;
  };

  return { organizaTotalPorMes };
};
