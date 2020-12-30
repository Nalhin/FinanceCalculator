export const FREQUENCY_TRANSLATIONS = {
  1: 'Anually (1)',
  2: 'Smi-Annually (2)',
  4: 'Quarterly (4)',
  6: 'Bi-Monthly (6)',
  12: 'Monthly (12)',
  24: 'Semi-Monthly (24)',
  52: 'Weekly (52)',
} as const;

export const FREQUENCY_ENTRIES = Object.entries(FREQUENCY_TRANSLATIONS).map(
  ([key, value]) => ({
    value: key,
    label: value,
  }),
);

export type Frequency = keyof typeof FREQUENCY_TRANSLATIONS;
