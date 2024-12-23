import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
  element?: HTMLElement;
};

const Portal = ({ children, element = document.body }: PortalProps) => createPortal(children, element);

export default Portal;
