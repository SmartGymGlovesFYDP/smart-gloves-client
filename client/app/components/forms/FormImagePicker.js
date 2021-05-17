import React from "react";
import { AppErrorMessage } from ".";
import { useFormikContext } from "formik";
import ImageInputList from "../ImageInputList";

function FormImagePicker({ name }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();
  const imageUris = values[name]; // needed as we are now receiving it from Formik

  const handleAdd = (uri) => {
    // spread operator takes a copy of the Uris array and adds the new one
    setFieldValue(name, [...imageUris, uri]);
  };
  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
