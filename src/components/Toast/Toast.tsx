import styles from './Toast.module.css';
import {RefObject, useCallback, useEffect, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {cn} from '../../utils/cn';

export interface IToast extends React.HTMLAttributes<HTMLDivElement> {
  containerRef: RefObject<HTMLElement>;
  openStyle?: string;
  x?: 'left' | 'right' | 'center';
  y?: 'top' | 'bottom';
  close: boolean;
  onClose: () => void;
}

export function Toast({
  className,
  children,
  containerRef,
  openStyle = styles.open,
  x = 'left',
  y = 'bottom',
  close,
  onClose,
  ...props
}: IToast) {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [recompute, setRecompute] = useState(true);
  const onWindowResizeOrScroll = useCallback(() => {
    setRecompute(true);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onWindowResizeOrScroll);
    window.addEventListener('scroll', onWindowResizeOrScroll);
    setRoot(document.querySelector<HTMLDivElement>('#page-ui'));
    return () => {
      window.removeEventListener('resize', onWindowResizeOrScroll);
      window.removeEventListener('scroll', onWindowResizeOrScroll);
    };
  }, [onWindowResizeOrScroll]);

  const softClosing = useCallback(
    (e: TransitionEvent) => {
      const element = ref.current;
      if (e.currentTarget === element) {
        onClose();
        element?.removeEventListener('transitionend', softClosing);
      }
    },
    [onClose, ref]
  );

  useEffect(() => {
    if (close) {
      const element = ref.current;
      if (element && openStyle) {
        element.classList.remove(openStyle);
        element.addEventListener('transitionend', softClosing);
      } else onClose();
    } else if (root && ref.current && openStyle) {
      requestAnimationFrame(() => {
        ref.current?.classList.add(openStyle);
      });
    }
  }, [close, onClose, openStyle, root]);

  useEffect(() => {
    const container = containerRef.current;
    const element = ref.current;
    if (!container || !element) return;
    const containerRect = container.getBoundingClientRect();

    let xPos: number | null = null;
    if (x === 'right') {
      xPos = containerRect.left - (element.clientWidth - containerRect.width);
      if (xPos < 0) {
        xPos = 0;
        if (xPos > containerRect.left) xPos = containerRect.left;
      }
    } else if (x === 'center') {
      xPos = containerRect.left - (element.clientWidth - containerRect.width) / 2;
      if (xPos < 0) {
        xPos = 0;
        if (xPos > containerRect.left) xPos = containerRect.left;
      }
    } else {
      xPos = containerRect.left;
      if (containerRect.left + element.clientWidth > window.innerWidth) {
        xPos = containerRect.left - (containerRect.left + element.clientWidth - window.innerWidth);
        if (xPos + element.clientWidth < containerRect.right) {
          xPos = containerRect.left - element.clientWidth - containerRect.width;
        }
      }
    }
    let yPos: number | null = null;
    if (y === 'top') {
      yPos = containerRect.top - element.clientHeight;
      if (yPos < 0) yPos = containerRect.bottom;
    } else {
      yPos = containerRect.bottom;
      if (yPos + element.clientHeight > window.screenX + window.innerHeight)
        yPos = containerRect.top - element.clientHeight;
    }
    element.style.left = `${xPos}px`;
    element.style.top = `${yPos}px`;
    if (recompute) setRecompute(false);
  }, [containerRef, ref, root, recompute, x, y]);
  if (!root) return null;
  return createPortal(
    <div className={cn(styles.container, className)} ref={ref} {...props}>
      {children}
    </div>,
    root
  );
}
