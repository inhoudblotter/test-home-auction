import {Field, FieldAttributes} from 'formik';
import {cn} from '../../utils/cn';
import styles from './FieldWithLabel.module.css';
import {useRef} from 'react';
import {Error} from './ui/Error/Error';

export function FieldWithLabel({
  label,
  className,
  error,
  setError,
  ...props
}: FieldAttributes<{
  label: string;
  error?: string;
  setError: (message: string | undefined) => void;
}>) {
  const ref = useRef<HTMLLabelElement>(null);
  return (
    <label className={cn(styles.container, className)} ref={ref}>
      <span className={styles.label}>{label}</span>
      <Field className={styles.input} {...props} />
      {error && <Error message={error} containerRef={ref} onClose={() => setError(undefined)} />}
    </label>
  );
}
