import {useState} from 'react';
import {cn} from '../../../../utils/cn';
import {IToast, Toast} from '../../../Toast';
import styles from './Error.module.css';
export function Error({className, message, ...props}: Omit<IToast, 'close'> & {message: string}) {
  const [close, setClose] = useState(false);
  return (
    <Toast className={styles.toast} close={close} openStyle={styles.open} {...props} x="left">
      <div className={cn(styles.container)}>
        <span className={styles.messsage}>{message}</span>
        <button className={styles.close} onClick={() => setClose(true)}>
          X
        </button>
      </div>
    </Toast>
  );
}
