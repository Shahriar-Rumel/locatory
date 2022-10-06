import React from 'react';
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native';

export default function AppForm({
  initialValues,
  onSubmit,
  validationSchema,
  children
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <View style={styles.form}>{children}</View>}
    </Formik>
  );
}

const styles = StyleSheet.create({
  form: {
    width: '100%',
    marginVertical: 20
  }
});
