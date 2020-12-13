import React from 'react';
import { Control, useWatch } from 'react-hook-form';
import { InvestmentConfig } from '../../../models/compound-interest-rate-calculator/compound-interest-rate-calculator';

interface Props {
  control: Control;
  render: (config: InvestmentConfig) => React.ReactElement;
}

const WithInvestmentConfig = ({ control, render }: Props) => {
  const config = useWatch<InvestmentConfig>({ control });

  // @ts-ignore
  return render(config);
};

export default WithInvestmentConfig;
