export const getColor = (value: number): string => {
  if (value <= 13) return "#187218";
  else if (value <= 35) return "#E8E372";
  else if (value <= 55) return "#FFA500";
  else if (value <= 150) return "#F00";
  else if (value <= 250) return "#950AD7";
  else return "#584949";
};
