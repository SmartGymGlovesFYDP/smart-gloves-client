import React from "react";
import AppTextInput from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";

function AppFormField({ name, width, ...otherProps }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
