import { css } from 'leather-styles/css';
import { styled } from 'leather-styles/jsx';

const linkStyle = css({
  textDecoration: 'underline',
  _hover: {
    color: 'ink.text-primary',
  },
});

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <styled.a href={href} target="_blank" rel="noopener noreferrer" className={linkStyle}>
    {children}
  </styled.a>
);

export function StackingDisclaimer() {
  return (
    <styled.p textStyle="caption.01" color="#716A60" w="100%" maxW="860px">
      This website provides the interface to connect with a directory of yield and Stacking service providers. We don&apos;t provide the Stacking service ourselves nor do we operate the protocol that provide yield. Read our <ExternalLink href="https://leather.io/frequent-questions#stacking">FAQs</ExternalLink>{' '}
      and review our <ExternalLink href="https://leather.io/terms">Terms</ExternalLink> to learn
      more.
    </styled.p>
  );
}
