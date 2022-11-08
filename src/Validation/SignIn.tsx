import { useFormik, withFormik } from "formik";
import React, { FC, InputHTMLAttributes } from "react";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
import WithUser from "../WithUser";
import WithAlert from "../WithAlert";

const initialValues = {
  email: "  ",
  password: "",
};

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

function Submit(values, bag) {
  console.log("Data is sending ", values);
  axios
    .post("https://myeasykart.codeyogi.io/login", {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      const { user, token } = response.data;
      bag.props.setUser(user);
      localStorage.setItem("token", token);
      bag.props.setAlert({ message: "LogIn Successful", type: "success" });
    })
    .catch((e) => {
      bag.props.setAlert({ message: "INVALID CREDENTIALS", type: "error" });
    });
}

type SignInProps =
  | {
      
    }
  | InputHTMLAttributes<HTMLInputElement>;

const SignIn: FC<SignInProps> = ({
  handleSubmit,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}) => {
  return (
    <div className="shadow-xl mx-3 my-10 sm:p-20 p-4 space-y-5  text-sm font-bold bg-white text-gray-700 max-w-5xl md:mx-auto md:text-base">
      <h1 className="text-2xl ">Login</h1>
      <form
        className="p-6 flex flex-col space-y-3 border"
        onSubmit={handleSubmit}
      >
        {/* <AiOutlineUser className="text-2xl relative top-[78px] left-3 " /> */}
        <label htmlFor="email">Username or email address *</label>
        <Input
          id="email"
          type="email"
          name={"email"}
          value={values.email}
          onChange={handleChange}
          errors={errors.email}
          touched={touched.email}
          onBlur={handleBlur}
        />
        <label htmlFor="pass">Password</label>
        <Input
          id="pass"
          name={"password"}
          type="password"
          value={values.password}
          onChange={handleChange}
          errors={errors.password}
          touched={touched.password}
          onBlur={handleBlur}
        />

        <div className="space-y-1">
          <div className="flex space-x-2">
            <input type="checkbox" id="remind" />
            <label htmlFor="remind">remember me</label>
          </div>
          <button
            className="px-8 py-2 bg-red-400 rounded-md text-white"
            type="Submit"
          >
            LOG IN
          </button>
        </div>
        <div className="flex justify-between text-red-500 ">
          <Link
            to="/component/validation/ResetPassword"
            className="text-red-500 text-[100%]"
          >
            Lost your password?
          </Link>
          <Link to="/component/validation/SignUp">Create New Account</Link>
        </div>
      </form>
    </div>
  );
};

const myHOC = withFormik({
  validationSchema: schema,
  initialValues: initialValues,
  handleSubmit: Submit,
})(SignIn);
export default WithAlert(WithUser(myHOC));
