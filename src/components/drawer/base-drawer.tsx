import { ReactNode, Suspense, memo, useCallback, useEffect, useRef } from 'react';

import { css } from 'leather-styles/css';
import { Box, Flex, FlexProps } from 'leather-styles/jsx';

import { useNavigate } from '@hooks/use-navigate';
import { useOnClickOutside } from '@hooks/use-onclickoutside';

import { DrawerHeader } from './components/drawer-header';

const transition = 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)';

function useDrawer(isShowing: boolean, onClose: () => void, pause?: boolean) {
  const ref = useRef(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isShowing && e.key === 'Escape') {
        onClose();
      }
    },
    [onClose, isShowing]
  );

  useOnClickOutside(ref, !pause && isShowing ? onClose : null);

  useEffect(() => {
    addEventListener('keydown', handleKeyDown);

    return () => {
      removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return ref;
}

interface BaseDrawerProps extends Omit<FlexProps, 'title'> {
  children?: ReactNode;
  enableGoBack?: boolean;
  icon?: JSX.Element;
  isShowing: boolean;
  isWaitingOnPerformedAction?: boolean;
  onClose?(): void;
  pauseOnClickOutside?: boolean;
  title?: string;
  waitingOnPerformedActionMessage?: string;
}
const BaseDrawerComponent = (props: BaseDrawerProps) => {
  const {
    children,
    enableGoBack,
    icon,
    isShowing,
    isWaitingOnPerformedAction,
    onClose,
    pauseOnClickOutside,
    title,
    waitingOnPerformedActionMessage,
    ...rest
  } = props;
  const ref = useDrawer(
    isShowing,
    onClose
      ? onClose
      : () => {
          return;
        },
    pauseOnClickOutside
  );
  const navigate = useNavigate();

  const onGoBack = () => navigate(-1);

  return (
    <Flex
      display={isShowing ? 'flex' : 'none'}
      className={css({
        bg: isShowing ? 'black/40' : 'unset',
      })}
      transition={transition}
      position="fixed"
      top={0}
      left={0}
      height="100%"
      pt="space.09"
      width="100%"
      alignItems={['flex-end', 'center', 'center']}
      justifyContent="center"
      flexDirection="column"
      zIndex={1000}
      style={{
        pointerEvents: !isShowing ? 'none' : 'unset',
        userSelect: !isShowing ? 'none' : 'unset',
        willChange: 'background',
      }}
      {...rest}
    >
      <Flex
        flexDirection="column"
        flexGrow={0}
        ref={ref}
        opacity={isShowing ? 1 : 0}
        transform={isShowing ? 'none' : 'translateY(35px)'}
        transition={isShowing ? transition + ' 0.1s' : transition}
        transitionDuration="0.4s"
        willChange="transform, opacity"
        bg="ink.background-primary"
        width="100%"
        maxWidth="472px"
        borderTopLeftRadius="16px"
        borderTopRightRadius="16px"
        borderBottomLeftRadius={[0, '16px', '16px', '16px']}
        borderBottomRightRadius={[0, '16px', '16px', '16px']}
        position="relative"
        mt={['auto', 'unset', 'unset', 'unset']}
        maxHeight={['calc(100vh - 24px)', 'calc(100vh - 96px)']}
      >
        <Box
          className={css({
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          })}
        >
          <DrawerHeader
            enableGoBack={enableGoBack}
            icon={icon}
            isWaitingOnPerformedAction={isWaitingOnPerformedAction}
            onClose={onClose}
            onGoBack={onGoBack}
            title={title}
            waitingOnPerformedActionMessage={waitingOnPerformedActionMessage}
          />
          <Flex maxHeight="100%" flexGrow={1} flexDirection="column">
            <Suspense fallback={<></>}>{children}</Suspense>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
export const BaseDrawer = memo(BaseDrawerComponent);
