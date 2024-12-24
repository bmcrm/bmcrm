import type { ReactNode } from 'react';
import { classNames } from '@shared/lib/classNames';
import { Container } from '@shared/ui/Container';
import styles from './AuthPageTemplate.module.scss';

type AuthPageTemplateProps = {
  className?: string;
  children?: ReactNode;
};

const AuthPageTemplate = ({ className, children }: AuthPageTemplateProps) => (
  <section className={classNames(styles.authPage, {}, [className])}>
    <Container>
      {children}
    </Container>
  </section>
);

export default AuthPageTemplate;
