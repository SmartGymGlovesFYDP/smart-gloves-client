import React from "react";
import { Formik } from "formik";

function AppForm({ initialValues, onSubmit, validationSchema, children }) {
  // idea behind this is have a way to use Formik without repeating the function and React Fragments
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
