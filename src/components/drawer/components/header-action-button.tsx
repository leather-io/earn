import { SVGAttributes } from 'react';

import { Box as StacksBox, color } from '@stacks/ui';
import { css } from 'leather-styles/css';
import { Box, Grid } from 'leather-styles/jsx';
import { token } from 'leather-styles/tokens';
import { useHover } from 'use-events';

const transition = 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)';

interface IconBaseProps extends SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}
type IconType = (props: IconBaseProps) => JSX.Element;

interface HeaderActionButtonProps {
  icon?: IconType;
  isWaitingOnPerformedAction?: boolean;
  onAction?(): void;
}
export function HeaderActionButton(props: HeaderActionButtonProps) {
  const { icon, isWaitingOnPerformedAction, onAction } = props;
  const [isHovered, bind] = useHover();

  return (
    <Grid
      className={css({
        _hover: {
          cursor: isWaitingOnPerformedAction ? 'unset' : 'pointer',
        },
      })}
      borderRadius="100%"
      onClick={isWaitingOnPerformedAction ? undefined : onAction}
      opacity={isWaitingOnPerformedAction ? '0.3' : 'unset'}
      placeItems="center"
      position="relative"
      height="36px"
      width="36px"
      transition={transition}
      userSelect="none"
      zIndex={9}
      {...bind}
    >
      <StacksBox as={icon} size="20px" color={token('colors.ink.text-subdued')} />
      <Box
        bg={color('invert')}
        borderRadius="100%"
        left={0}
        opacity={isHovered && !isWaitingOnPerformedAction ? 0.12 : 0}
        position="absolute"
        height="100%"
        top={0}
        transition={transition}
      />
    </Grid>
  );
}
