import { AnimatePresence } from 'framer-motion';
import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import * as styles from './Modal.css';
import { BsXLg } from 'react-icons/bs';

export type ModalProps = {
  header?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  header,
  children,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.root}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <div className={styles.backdrop} onClick={onClose} />
          <motion.div
            className={styles.content}
            initial={{
              y: 20,
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: -20,
            }}
          >
            <button className={styles.close} type="button" onClick={onClose}>
              <BsXLg />
            </button>
            {header && <div className={styles.header}>{header}</div>}
            <div className={styles.body}>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('modal') as HTMLDivElement,
  );
};
