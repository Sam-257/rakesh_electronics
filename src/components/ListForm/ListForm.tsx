import { useFormContext, useFieldArray } from 'react-hook-form';
import type { SectionConfig } from '../../types/content';
import { iconNames } from '../../utils/iconMap';
import FieldInput from '../FieldInput/FieldInput';
import styles from './ListForm.module.css';

const ListForm = ({ config }: { config: SectionConfig }) => {
  const { control } = useFormContext();
  const { fields, append, remove, swap } = useFieldArray({ control, name: 'items' });

  const createBlankItem = () => {
    const blank: Record<string, unknown> = {};
    config.fields.forEach((f) => {
      if (f.type === 'number') blank[f.name] = 0;
      else if (f.type === 'icon') blank[f.name] = iconNames[0];
      else if (f.type === 'color') blank[f.name] = '#3b82f6';
      else blank[f.name] = '';
    });
    blank.id = Date.now();
    return blank;
  };

  return (
    <div className={styles.listEditor}>
      {fields.map((item, index) => (
        <div key={item.id} className={styles.listItem}>
          <div className={styles.listItemHeader}>
            <span className={styles.listItemIndex}>#{index + 1}</span>
            <div className={styles.listItemActions}>
              <button
                type="button"
                onClick={() => swap(index, index - 1)}
                disabled={index === 0}
                className={styles.moveBtn}
                title="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => swap(index, index + 1)}
                disabled={index === fields.length - 1}
                className={styles.moveBtn}
                title="Move down"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className={styles.removeBtn}
                title="Remove"
              >
                ✕
              </button>
            </div>
          </div>
          <div className={styles.listItemFields}>
            {config.fields.map((f) => (
              <FieldInput
                key={f.name}
                name={`items.${index}.${f.name}`}
                field={f}
              />
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append(createBlankItem())}
        className={styles.addBtn}
      >
        + Add Item
      </button>
    </div>
  );
};

export default ListForm;
