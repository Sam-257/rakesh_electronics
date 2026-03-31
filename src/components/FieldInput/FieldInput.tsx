import { useFormContext, useController } from 'react-hook-form';
import type { SectionField } from '../../types/content';
import { iconNames, IconRenderer } from '../../utils/iconMap';
import styles from './FieldInput.module.css';

interface FieldInputProps {
  name: string;
  field: SectionField;
}

const FieldInput = ({ name, field }: FieldInputProps) => {
  const { control } = useFormContext();
  const { field: ctrl, fieldState: { error } } = useController({ name, control });
  const hasError = !!error;

  function renderInput() {
    switch (field.type) {
      case 'icon':
        return (
          <div className={styles.iconSelect}>
            <select
              name={name}
              value={ctrl.value || ''}
              onChange={(e) => ctrl.onChange(e.target.value)}
              onBlur={ctrl.onBlur}
              className={styles.input}
              aria-label={field.label}
            >
              {iconNames.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            {ctrl.value && (
              <span className={styles.iconPreview}>
                <IconRenderer name={ctrl.value} />
              </span>
            )}
          </div>
        );

      case 'color':
        return (
          <div className={styles.colorField}>
            <input
              type="color"
              value={ctrl.value || '#3b82f6'}
              onChange={(e) => ctrl.onChange(e.target.value)}
              className={styles.colorInput}
              aria-label={`${field.label} color picker`}
            />
            <input
              type="text"
              name={ctrl.name}
              value={ctrl.value || ''}
              onChange={ctrl.onChange}
              onBlur={ctrl.onBlur}
              className={`${styles.input} ${hasError ? styles.inputError : ''}`}
              placeholder="#3b82f6"
            />
          </div>
        );

      case 'textarea':
        return (
          <textarea
            name={ctrl.name}
            value={ctrl.value || ''}
            onChange={ctrl.onChange}
            onBlur={ctrl.onBlur}
            className={`${styles.textarea} ${hasError ? styles.inputError : ''}`}
            rows={4}
            aria-label={field.label}
          />
        );

      case 'number':
        return (
          <input
            type="number"
            name={name}
            value={ctrl.value ?? ''}
            onBlur={ctrl.onBlur}
            onChange={(e) => {
              const v = e.target.value;
              ctrl.onChange(v === '' ? '' : Number(v));
            }}
            className={`${styles.input} ${hasError ? styles.inputError : ''}`}
            aria-label={field.label}
          />
        );

      default:
        return (
          <input
            type="text"
            name={ctrl.name}
            value={ctrl.value || ''}
            onChange={ctrl.onChange}
            onBlur={ctrl.onBlur}
            className={`${styles.input} ${hasError ? styles.inputError : ''}`}
            aria-label={field.label}
          />
        );
    }
  }

  return (
    <div className={styles.field}>
      <label className={styles.label}>{field.label}</label>
      {renderInput()}
      {hasError && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default FieldInput;
