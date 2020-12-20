import React from 'react';
import { useForm } from 'react-hook-form';
import { InvestmentConfig } from '../../../models/compound-interest-rate-calculator/compound-interest-rate-calculator/compound-interest-rate-calculator';
import { DEFAULT_INVESTMENT_CONFIG } from '../../../constants/default-investment-config';
import InvestmentConfigFormControlGroup from './investment-config-form-control-group';
import { renderWithProviders } from '../../../../../test/render/render-with-providers';
import { Button } from '@chakra-ui/react';
import { investmentConfigFactory } from '../../../../../test/factory/investment/investment';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const TestForm = ({
  onSubmit,
}: {
  onSubmit: (c: InvestmentConfig) => void;
}) => {
  const { control, handleSubmit } = useForm<InvestmentConfig>({
    defaultValues: DEFAULT_INVESTMENT_CONFIG,
  });

  const submit = (form: InvestmentConfig) => {
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <InvestmentConfigFormControlGroup control={control} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

describe('InvestmentConfigFormPart component', () => {
  it('should modify form values', async () => {
    const expectedFormValues = investmentConfigFactory.buildOne();
    const onSubmit = jest.fn();
    renderWithProviders(<TestForm onSubmit={onSubmit} />);

    userEvent.type(
      screen.getByLabelText(/initial amount/i),
      `{selectall}${expectedFormValues.startAmount}`,
    );
    userEvent.type(
      screen.getByLabelText(/estimated annual rate of return/i),
      `{selectall}${expectedFormValues.annualInterestRate}`,
    );
    userEvent.type(
      screen.getByLabelText(/years of growth/i),
      `{selectall}${expectedFormValues.yearsOfGrowth}`,
    );
    userEvent.type(
      screen.getByLabelText(/additional payment/i),
      `{selectall}${expectedFormValues.payment}`,
    );
    userEvent.selectOptions(
      screen.getByLabelText(/payment frequency/i),
      String(expectedFormValues.paymentFrequency),
    );
    userEvent.selectOptions(
      screen.getByLabelText(/compound frequency/i),
      String(expectedFormValues.compoundFrequency),
    );
    userEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toBeCalledWith(expectedFormValues);
    });
  });
});
