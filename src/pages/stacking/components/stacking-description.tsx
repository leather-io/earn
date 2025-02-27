import { BoxProps, styled } from 'leather-styles/jsx';

export function StackingDescription({ children, ...props }: BoxProps) {
  return (
    <styled.p textStyle="body.large" display="block" color="ink.text-subdued" {...props}>
      {children}
    </styled.p>
  );
}
