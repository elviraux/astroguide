export const Colors = {
  cosmicMidnightBlue: '#0D0D1A', // Deep Void Black theme
  mysticPurple: '#483D8B',
  starlightGold: '#FFD700',
  lunarWhite: '#F5F5F5',
  darkPurple: '#2E1B4D',
  deepSpace: '#0A0A1A',
};

export const createGradient = (colors: string[]) => ({
  colors,
  start: { x: 0, y: 0 },
  end: { x: 0, y: 1 },
});
