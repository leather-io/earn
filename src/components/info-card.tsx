import React, { FC, cloneElement, isValidElement } from 'react';

import {
  Box,
  BoxProps,
  Flex,
  HTMLStyledProps,
  Stack,
  StackProps,
  styled,
} from 'leather-styles/jsx';
import { FlexProps } from 'leather-styles/jsx';

import { Hr } from '@components/hr';
import { ExplainerTooltip } from '@components/tooltip';

export function InfoCard(props: FlexProps) {
  return (
    <Flex
      flexDirection="column"
      border="1px solid"
      borderColor="ink.border-default"
      minHeight="84px"
      {...props}
    />
  );
}

type ChildProps = BoxProps;

type TChild = string | React.ReactElement<ChildProps>;

interface Props extends BoxProps {
  children: TChild | TChild[];
}
export const InfoCardGroup = ({ children, ...props }: Props) => {
  const parsedChildren = Array.isArray(children) ? children : [children];
  const infoGroup = parsedChildren.flatMap((child, index) => {
    if (!isValidElement(child)) return null;
    return [
      cloneElement(child, {
        key: index,
        mb: index === parsedChildren.length ? '280px' : undefined,
      }),
      index !== parsedChildren.length - 1 && <Hr my="loose" key={index.toString() + '-hr'} />,
    ];
  });
  return <Box {...props}>{infoGroup}</Box>;
};

export const InfoCardSection: FC<StackProps> = ({ children, ...props }) => (
  <Stack {...props}>{children}</Stack>
);

export const InfoCardRow: FC<FlexProps> = props => (
  <Flex justifyContent="space-between" {...props} />
);

interface InfoCardLabelProps extends FlexProps {
  explainer?: string;
}
export const InfoCardLabel: FC<InfoCardLabelProps> = ({ children, ...props }) => (
  <Flex color="ink.text-primary" alignItems="center" {...props}>
    <Box mr={props.explainer ? 'space.01' : undefined}>{children}</Box>
    {props.explainer && <ExplainerTooltip>{props.explainer}</ExplainerTooltip>}
  </Flex>
);

export const InfoCardValue = (props: HTMLStyledProps<'p'>) => (
  <styled.p textStyle="body.01" textAlign="right" color="ink.text-subdued" {...props} />
);
