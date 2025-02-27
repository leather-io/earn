import { Box, Flex, HTMLStyledProps } from 'leather-styles/jsx';
import { styled } from 'leather-styles/jsx';
import { useFocus } from 'use-events';

type DelegationTypes = 'limited' | 'indefinite';

interface DurationSelectItemProps extends Omit<HTMLStyledProps<'label'>, 'onChange'> {
  title: string;
  delegationType: DelegationTypes;
  activeDelegationType: DelegationTypes | null;
  onChange(duration: DelegationTypes): void;
  icon: JSX.Element;
}

export function DurationSelectItem(props: DurationSelectItemProps) {
  const { title, icon, delegationType, activeDelegationType, onChange, children, ...rest } = props;
  const [isFocused, bind] = useFocus();

  return (
    <styled.label
      minHeight="72px"
      p="base-loose"
      htmlFor={delegationType}
      border="1px solid"
      borderColor="ink.border-default"
      borderRadius="12px"
      position="relative"
      {...(isFocused
        ? {
            _before: {
              content: '""',
              position: 'absolute',
              top: '-1px',
              left: '-1px',
              right: '-1px',
              bottom: '-1px',
              borderRadius: '12px',
              border: '2px solid black',
            },
          }
        : {})}
      {...rest}
    >
      <Flex width="100%">
        <Box position="relative" top="-3px">
          {icon}
        </Box>
        <Flex ml="base-loose" width="100%" flexDirection={['column', 'row']}>
          <Box>
            <styled.p
              textStyle="body.02"
              fontWeight={500}
              display="block"
              style={{ wordBreak: 'break-all' }}
            >
              {title}
            </styled.p>
            <styled.p
              textStyle="body.02"
              color="ink.text-subdued"
              mt="tight"
              display="inline-block"
              lineHeight="18px"
            >
              {children}
            </styled.p>
          </Box>
        </Flex>
        <Flex ml="loose" alignItems="center">
          <input
            type="radio"
            id={delegationType}
            name="delegationType"
            value={delegationType}
            checked={delegationType === activeDelegationType}
            style={{ transform: 'scale(1.2)', outline: 0 }}
            onChange={e => onChange(e.target.value as DelegationTypes)}
            {...bind}
          />
        </Flex>
      </Flex>
    </styled.label>
  );
}
