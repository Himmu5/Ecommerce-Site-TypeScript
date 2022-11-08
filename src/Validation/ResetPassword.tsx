import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import {Link} from 'react-router-dom'

function ResetPassword() {
  const schema = Yup.object().shape({
    email: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema:schema,
  });

  return (
    <div className=" py-40 h-screen">
      <div className="shadow-xl mx-3 max-w-5xl sm:mx-10 md:mx-auto p-4 sm:p-20 bg-white space-y-3 flex flex-col">
        <p className="text-red-500">Reset Password</p>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter Username or Email "
          className="border px-4 py-2"
        />
        <div className="space-x-3">
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">
            Reset Password
          </button>
          <Link to="/">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Back to Home
          </button>
          </Link>
        </div>
        
      </div>
    </div>
  );
}
export default ResetPassword;
