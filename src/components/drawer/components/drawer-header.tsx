import { FiArrowLeft, FiX as IconX } from 'react-icons/fi';

import { Box, Flex, styled } from 'leather-styles/jsx';
import { useHover } from 'use-events';

import { HeaderActionButton } from './header-action-button';

interface DrawerHeaderProps {
  enableGoBack?: boolean;
  icon?: JSX.Element;
  isWaitingOnPerformedAction?: boolean;
  onClose?(): void;
  onGoBack(): void;
  title?: string;
  waitingOnPerformedActionMessage?: string;
}
export function DrawerHeader({
  enableGoBack,
  icon,
  isWaitingOnPerformedAction,
  onClose,
  onGoBack,
  title,
  waitingOnPerformedActionMessage,
}: DrawerHeaderProps) {
  const [isHovered, bind] = useHover();

  return (
    <Flex
      pb="base"
      justifyContent="space-between"
      alignItems="center"
      py="space.04"
      px="space.04"
      {...bind}
    >
      {enableGoBack ? (
        <HeaderActionButton
          icon={FiArrowLeft}
          isWaitingOnPerformedAction={isWaitingOnPerformedAction}
          onAction={onGoBack}
        />
      ) : (
        <Box width="36px" height="36px" />
      )}
      {icon && icon}
      {title && (
        <styled.p color="ink.background-primary" fontSize="20px" lineHeight="28px">
          {title}
        </styled.p>
      )}
      {isHovered && isWaitingOnPerformedAction && (
        <styled.p color="ink.background-primary" fontSize="14px" fontWeight={500}>
          {waitingOnPerformedActionMessage}
        </styled.p>
      )}
      {onClose ? (
        <HeaderActionButton
          icon={IconX}
          isWaitingOnPerformedAction={isWaitingOnPerformedAction}
          onAction={onClose}
        />
      ) : (
        <Box width="36px" height="36px" />
      )}
    </Flex>
  );
}
