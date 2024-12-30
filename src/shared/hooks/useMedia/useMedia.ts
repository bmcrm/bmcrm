import { useMediaQuery } from 'react-responsive';

type UseMediaProps = {
  smallMobileBreakpoint?: string;
  mobileBreakpoint?: string;
  tabletBreakpoint?: string;
  PCBreakpoint?: string;
};

export const useMedia = ({
  smallMobileBreakpoint = '374px',
  mobileBreakpoint = '767px',
  tabletBreakpoint = '1023px',
  PCBreakpoint = '1279px',
}: UseMediaProps = {}) => {
  const isSmallMobile = useMediaQuery({ query: `(max-width: ${smallMobileBreakpoint})` });
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileBreakpoint})` });
  const isTablet = useMediaQuery({ query: `(max-width: ${tabletBreakpoint})` });
  const isPC = useMediaQuery({ query: `(max-width: ${PCBreakpoint})` });

  return {
    isPC,
    isTablet,
    isMobile,
    isSmallMobile,
  };
};
