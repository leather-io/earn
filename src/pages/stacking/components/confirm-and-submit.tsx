import { Action, Step } from './stacking-form-step';

interface ConfirmAndSubmitProps {
  isLoading: boolean;
  title: string;
  actionLabel: string;
  isDisabled?: boolean;
}

export function ConfirmAndSubmit({
  isLoading,
  title,
  actionLabel,
  isDisabled,
}: ConfirmAndSubmitProps) {
  return (
    <Step title={title}>
      <Action type="submit" isLoading={isLoading} isDisabled={isDisabled}>
        {actionLabel}
      </Action>
    </Step>
  );
}
