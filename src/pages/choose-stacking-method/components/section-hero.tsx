import { css } from 'leather-styles/css';
import { Box, Flex, styled } from 'leather-styles/jsx';

import { OpenLinkInNewTab } from '@components/open-link-in-new-tab';

interface SectionHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: React.ReactNode;
  link?: {
    text: string;
    href: string;
  };
}

export const SectionHero = (props: SectionHeroProps) => {
  const { title, subtitle, description, image, link } = props;
  return (
    <Flex
      className={css({
        backgroundColor: 'ink.text-primary',
        flexWrap: ['wrap', 'wrap', 'wrap', 'nowrap'],
        justifyContent: 'space-between',
      })}
      alignItems="center"
      flexDirection="row"
    >
      <Box
        pt={{ base: 'space.08', lg: 'space.05' }}
        pr={{ base: 'space.05', lg: 'space.10' }}
        pb={{ base: '0', lg: 'space.05' }}
        pl={{ base: 'space.06', lg: 'space.10' }}
        maxWidth="800px"
      >
        <styled.h1
          className={css({
            textTransform: 'uppercase',
            color: 'ink.background-primary',
            fontSize: '44px',
          })}
          textStyle="heading.02"
        >
          {title}
        </styled.h1>
        <styled.p
          className={css({ lineHeight: '28px', color: 'ink.background-primary', fontSize: '26px' })}
          textStyle="body.01"
          my="space.06"
        >
          {subtitle}
        </styled.p>
        <styled.p
          textStyle="body.01"
          fontSize="16px"
          color="ink.background-secondary"
          lineHeight="24px"
        >
          {description}
        </styled.p>
        {link && (
          <Box mt="space.06">
            <OpenLinkInNewTab
              href={link.href}
              className={css({
                color: 'ink.background-primary',
                textDecorationLine: 'underline',
                textDecorationColor: 'ink.text-subdued',
                textUnderlineOffset: '4px',
                cursor: 'pointer',
                _hover: {
                  color: 'ink.background-primary',
                  textDecorationColor: 'ink.text-subdued',
                },
              })}
              textStyle="body.01"
              fontSize="16px"
            >
              {link.text} →
            </OpenLinkInNewTab>
          </Box>
        )}
      </Box>
      <Box className={css({ margin: { base: ['space.06', 'space.06'], lgDown: 'space.04' } })}>
        {image}
      </Box>
    </Flex>
  );
};
