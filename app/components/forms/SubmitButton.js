import React from 'react';
import { useFormikContext } from 'formik';

import Button from '../Button';

export default function SubmitButton({ text }) {
  const { handleSubmit } = useFormikContext();

  return <Button text={text} onPress={handleSubmit} />;
}
