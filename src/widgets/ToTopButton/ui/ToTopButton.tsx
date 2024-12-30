import { useState, useEffect, useCallback, memo } from 'react';
import { classNames } from '@shared/lib/classNames';
import Icon from '@shared/ui/Icon/ui/Icon.tsx';
import styles from './ToTopButton.module.scss';
import ArrowUp from '@shared/assets/icons/arrow-top.svg';

const ToTopButton = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY >= 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button onClick={scrollToTop} className={classNames(styles.btnToTop, { [styles.hidden]: !isVisible }, [])}>
      <Icon icon={<ArrowUp />} />
    </button>
  );
});

export default ToTopButton;