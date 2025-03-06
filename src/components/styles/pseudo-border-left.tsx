import { css } from 'leather-styles/css';
import { ColorToken } from 'leather-styles/tokens';
import { AnyString, ConditionalValue } from 'leather-styles/types';

type ThemeColorType = ConditionalValue<readonly string[] | AnyString | ColorToken | undefined>;

export function pseudoBorderLeft(themeColor: ThemeColorType, borderWidth = '4px') {
  return css({
    position: 'relative',
    _before: {
      content: '""',
      top: 0,
      left: 0,
      borderRadius: '8px',
      width: borderWidth,
      height: '100%',
      position: 'absolute',
      background: themeColor,
    },
  });
}
