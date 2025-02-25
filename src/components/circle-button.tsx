import { Button, ButtonProps } from '@leather.io/ui';

type CircleButtonProps = ButtonProps;

export function CircleButton(props: CircleButtonProps) {
  return (
    <Button
      size="sm"
      width="28px"
      height="28px"
      variant="ghost"
      backgroundColor="ink.background-secondary"
      _hover={{ color: 'ink.text-primary' }}
      style={{ userSelect: 'none' }}
      borderRadius="50%"
      fontWeight={800}
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    />
  );
}
