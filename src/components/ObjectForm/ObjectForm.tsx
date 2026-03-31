import type { SectionConfig } from '../../types/content';
import FieldInput from '../FieldInput/FieldInput';
import styles from './ObjectForm.module.css';

const ObjectForm = ({ config }: { config: SectionConfig }) => {
  return (
    <div className={styles.grid}>
      {config.fields.map((f) => (
        <FieldInput key={f.name} name={f.name} field={f} />
      ))}
    </div>
  );
};

export default ObjectForm;
