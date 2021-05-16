import React from "react";
import { useFormikContext } from "formik";
import AppPicker from "../AppPicker";
import { AppErrorMessage } from ".";

function AppFormPicker({
  items,
  name,
  PickerItemComponent,
  placeholder,
  width,
  numberOfColumns,
}) {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  return (
    <>
      <AppPicker
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
        PickerItemComponent={PickerItemComponent}
        numberOfColumns={numberOfColumns}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
