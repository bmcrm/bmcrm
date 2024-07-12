import { useState, useEffect } from 'react';
import s from './ToTopButton.module.scss';
import clsx from 'clsx';
import Icon from 'shared/ui/Icon/Icon';
import ArrowUp from 'shared/assets/icons/arrow-top.svg';
export const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY >= 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={scrollToTop} className={clsx(s.btnToTop, !isVisible && s.hidden)}>
      <Icon icon={<ArrowUp />} />
    </button>
  );
};
