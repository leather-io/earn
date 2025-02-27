import { Box, Flex, HTMLStyledProps, styled } from 'leather-styles/jsx';
import { useFocus } from 'use-events';

import { OpenExternalLinkInNewTab } from '@components/external-link';
import { figmaTheme } from '@constants/figma-theme';

import { ProtocolName } from '../types-preset-protocols';

interface ProtocolSelectItemProps extends Omit<HTMLStyledProps<'label'>, 'onChange'> {
  name: ProtocolName;
  description: string;
  url: string;
  icon: JSX.Element;
  activeProtocolName: ProtocolName;
  onChange(protocolName: ProtocolName): void;
}

export function ProtocolSelectItem(props: ProtocolSelectItemProps) {
  const { name, description, url, icon, activeProtocolName, onChange, ...rest } = props;
  const [isFocused, bind] = useFocus();
  return (
    <Box
      borderRadius={isFocused ? '12px' : undefined}
      borderWidth="2px"
      borderColor={isFocused ? figmaTheme.borderFocused : '#00000000'}
      _hover={{ cursor: 'pointer' }}
      borderStyle="solid"
    >
      <styled.label
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        minHeight="72px"
        p="space.04"
        border="1px solid"
        borderColor="ink.border-default"
        borderRadius="12px"
        position="relative"
        {...rest}
      >
        <Flex width="100%">
          <Box position="relative" top="-3px">
            {icon}
          </Box>
          <Flex ml="space.04" width="100%" flexDirection={['column', 'row']}>
            <Box>
              <styled.p
                textStyle="body.small"
                fontWeight={500}
                display="block"
                style={{ wordBreak: 'break-all' }}
              >
                {name}
              </styled.p>
              <styled.p
                textStyle="body.small"
                color="ink.text-subdued"
                mt="tight"
                display="inline-block"
                lineHeight="18px"
              >
                {description}
              </styled.p>

              {url && (
                <OpenExternalLinkInNewTab
                  href={url}
                  textStyle="body.small"
                  color="ink.text-subdued"
                  mt="tight"
                  display="inline-block"
                  lineHeight="18px"
                >
                  Learn more
                </OpenExternalLinkInNewTab>
              )}
            </Box>
          </Flex>
          <Flex ml="loose" alignItems="center">
            <input
              type="radio"
              id={name}
              name="protocolName"
              autoComplete="off"
              value={name}
              checked={name === activeProtocolName}
              style={{ transform: 'scale(1.2)', outline: 0 }}
              onChange={e => onChange(e.target.value as ProtocolName)}
              {...bind}
            />
          </Flex>
        </Flex>
      </styled.label>
    </Box>
  );
}
