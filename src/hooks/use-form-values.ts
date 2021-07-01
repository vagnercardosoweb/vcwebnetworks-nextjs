import React, { useCallback, useMemo, useState } from 'react';

import { dotToObject } from '@/utils';

type SubmitCallback<T> = (
  event: React.FormEvent<HTMLFormElement>,
  values: T,
) => Promise<void>;

export interface IUseFormValuesResponse<FormValues, ChangeEvent> {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  loadingFormValues: boolean;
  setLoadingFormValues: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeFormValues: (event: React.ChangeEvent<ChangeEvent>) => void;
  handleSubmitFormValues: (
    callback: SubmitCallback<FormValues>,
  ) => (event: React.FormEvent<HTMLFormElement>) => void;
  handleClearFormValues: (allowed?: string[]) => void;
}

export function useFormValues<
  FormValues,
  ChangeEvent = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
>(initialState: FormValues): IUseFormValuesResponse<FormValues, ChangeEvent> {
  const [formValues, setFormValues] = useState<FormValues>({ ...initialState });
  const [loadingFormValues, setLoadingFormValues] = useState<boolean>(false);

  const handleChangeFormValues = useCallback(event => {
    let type = event?.target?.type ?? null;
    let value = event?.target?.value ?? '';
    let name = event?.target?.name ?? '';

    if (event?.type === 'customSelect') {
      type = 'select';
      name = event?.name;
      value = event?.value;
    }

    if (type === 'file') {
      const files = event?.target?.files ?? [];
      value = files.length === 1 ? files[0] : files;
    } else if (['radio', 'checkbox'].includes(type)) {
      value = event?.target?.checked ?? false;
    }

    setFormValues(oldValues =>
      dotToObject({
        ...oldValues,
        [name]: value,
      }),
    );
  }, []);

  const handleClearFormValues = useCallback((allowedValues?: string[]) => {
    setFormValues(prevFormValues => {
      const newFormValues = { ...prevFormValues };

      if (Array.isArray(allowedValues)) {
        allowedValues.forEach(value => {
          newFormValues[value] = prevFormValues[value];
        });
      }

      return newFormValues;
    });
  }, []);

  const handleSubmitFormValues = useCallback(
    (callback: SubmitCallback<FormValues>) =>
      async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.persist();

        try {
          setLoadingFormValues(true);
          await callback(event, formValues);
        } finally {
          setLoadingFormValues(false);
        }
      },
    [formValues],
  );

  return useMemo(
    () => ({
      formValues,
      setFormValues,
      loadingFormValues,
      setLoadingFormValues,
      handleChangeFormValues,
      handleSubmitFormValues,
      handleClearFormValues,
    }),
    [
      formValues,
      loadingFormValues,
      handleClearFormValues,
      handleChangeFormValues,
      handleSubmitFormValues,
    ],
  );
}
