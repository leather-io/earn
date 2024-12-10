import { css } from 'leather-styles/css';
import { Box, Flex, styled } from 'leather-styles/jsx';

interface SectionHeroProps {
  title: string;
  subtitle: string;
  description: string;
  image: React.ReactNode;
}

export const SectionHero = (props: SectionHeroProps) => {
  const { title, subtitle, description, image } = props;
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
          color="ink.background-primary"
          lineHeight="24px"
        >
          {description}
        </styled.p>
      </Box>
      <Box className={css({ margin: { base: ['space.06', 'space.06'], lgDown: 'space.04' } })}>
        {image}
      </Box>
    </Flex>
  );
};
