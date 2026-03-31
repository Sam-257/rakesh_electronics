import { useState, useEffect } from 'react';
import { useParams, Navigate, useOutletContext } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import type { FieldValues, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ContentMap } from '../../types/content';
import { getContent, setContent, resetContent } from '../../services/contentService';
import { getSectionByPath, getValidationSchema } from './sections';
import ObjectForm from '../../components/ObjectForm/ObjectForm';
import ListForm from '../../components/ListForm/ListForm';
import styles from './EditorPage.module.css';

interface OutletContext {
  showToast: (msg: string) => void;
}

const EditorPage = () => {
  const { section } = useParams();
  const { showToast } = useOutletContext<OutletContext>();
  const config = getSectionByPath(section);
  const configKey = config?.key;

  const [loading, setLoading] = useState(true);

  const isList = config?.editor === 'list';
  const validationSchema = config ? getValidationSchema(config) : undefined;

  const methods = useForm<FieldValues>({
    resolver: validationSchema
      ? zodResolver(validationSchema as Parameters<typeof zodResolver>[0]) as Resolver<FieldValues>
      : undefined,
    defaultValues: {},
  });

  useEffect(() => {
    if (!configKey) return;
    let cancelled = false;
    setLoading(true);
    getContent(configKey).then((d) => {
      if (!cancelled) {
        const values = isList ? { items: Array.isArray(d) ? d : [] } : (d as unknown as Record<string, unknown> || {});
        methods.reset(values);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [configKey, isList, methods]);

  if (!config) return <Navigate to="/admin/hero" replace />;
  if (loading) return <p className={styles.loading}>Loading…</p>;

  const handleSubmit = async (values: FieldValues) => {
    const payload = isList ? (values as { items: unknown[] }).items : values;
    await setContent(config.key, payload as ContentMap[typeof config.key]);
    showToast('Changes saved!');
  };

  const handleReset = async () => {
    if (!window.confirm(`Reset "${config.label}" to defaults? This cannot be undone.`)) return;
    await resetContent(config.key);
    const fresh = await getContent(config.key);
    const newData = Array.isArray(fresh) ? [...fresh] : { ...(fresh as unknown as Record<string, unknown>) };
    methods.reset(isList ? { items: newData } : newData as Record<string, unknown>);
    showToast('Reset to defaults');
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className={styles.form}>
        <div className={styles.topBar}>
          <h2 className={styles.topTitle}>{config.label}</h2>
          <div className={styles.topActions}>
            <button
              type="button"
              onClick={handleReset}
              className={styles.resetBtn}
            >
              Reset to Defaults
            </button>
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={methods.formState.isSubmitting}
            >
              {methods.formState.isSubmitting ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
        <div className={styles.editorWrap}>
          {isList ? <ListForm config={config} /> : <ObjectForm config={config} />}
        </div>
      </form>
    </FormProvider>
  );
};

export default EditorPage;
