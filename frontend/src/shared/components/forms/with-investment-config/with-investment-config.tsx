import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import { InvestmentConfig } from '../../../models/interest-calculator/compound-interest-rate-calculator';
import { DEFAULT_INVESTMENT_CONFIG } from '../../../constants/default-investment-config';

interface Props {
  control: Control;
  render: (config: InvestmentConfig) => React.ReactElement;
}

const WithInvestmentConfig = ({ control, render }: Props) => {
  const config = useWatch<InvestmentConfig>({
    control,
    defaultValue: DEFAULT_INVESTMENT_CONFIG,
  });

  return render(config as InvestmentConfig);
};

export default WithInvestmentConfig;
