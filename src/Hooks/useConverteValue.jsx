export const useConverteValue = () => {
  const converteValue = (value, moeda) => {
    return Number(value).toLocaleString("pt-AO", {
      style: "currency",
      currency: moeda,
    });
  };

  return { converteValue };
};
