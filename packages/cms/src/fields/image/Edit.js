import React, { useState, useCallback, useEffect } from "react";
import { CFormGroup, CLabel } from "@coreui/react";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useFileReader } from "utils/useFileReader";
import { useData } from "context/data";

import "scss/components/image-edit.scss";

// TODO: Fina a way to validate
const Edit = ({ name, id, validations, help }) => {
  const { data } = useData();
  const [image, setImage] = useState(null);
  const { register, errors, setValue } = useFormContext();
  const [{ error, loading }, setFile] = useFileReader({
    method: "readAsDataURL",
    onload: setImage,
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setValue(id, acceptedFiles[0]);
    },
    [id, setFile, setValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    register({ name: id });
  }, [id, register]);

  useEffect(() => {
    if (data?.data?.[id]) {
      const val = data?.data[id];
      setValue(id, val);
      setImage(val?.thumb);
    }
  }, [id, data, setValue, setImage]);

  return (
    <CFormGroup>
      <CLabel htmlFor="name">
        {name} {validations?.required && "*"}
      </CLabel>
      <div className="image-update" {...getRootProps()}>
        {loading ? <p>Reading file</p> : null}
        {error ? <p>{error.message}</p> : null}
        {image ? (
          <div className="d-flex flex-column align-items-center">
            <img className="preview-img" src={image} alt="Preview Logo" />
            <p>Click here to change</p>
          </div>
        ) : (
          <div className="card">
            <div className="card-body">
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <p>Drag 'n' drop your image here, or click to select</p>
              )}
            </div>
          </div>
        )}
        <input {...getInputProps()} />
      </div>
      {errors[id] && (
        <div className="invalid-feedback">This field is required.</div>
      )}
      {help && <small className="form-text text-muted">{help}</small>}
    </CFormGroup>
  );
};

export default Edit;
