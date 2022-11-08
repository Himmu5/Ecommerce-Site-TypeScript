import React from "react";

export default function Input({
  value,
  onChange,
  onBlur,
  errors,
  type,
  touched,
  placeholder,
  name,
  id,
}) {
  return (
    <div className="">
      {touched && errors && <div className="text-red-400 ">{errors}</div>}
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        touched={touched}
        className="border px-4 py-2 w-full"
      />
    </div>
  );
}
