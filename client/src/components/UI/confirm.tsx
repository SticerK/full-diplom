import React, { PropsWithChildren } from 'react';
import styles from './UI.module.scss';

type ConfirmProps = {
  open: boolean;
  onOpen: (x: boolean) => void;
};

const Confirm: React.FC<PropsWithChildren<ConfirmProps>> = ({ open, onOpen, children }) => {
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }

    if (e.target.dataset.open) {
      onOpen(false);
    }
  };

  return open ? (
    <div className={styles.wrapperModal} data-open onClick={closeModal}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  ) : (
    <></>
  );
};

export default Confirm;
