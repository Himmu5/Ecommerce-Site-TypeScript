import { withFormik ,FormikBag} from "formik";
import React, { FC, InputHTMLAttributes } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Input from "../Ui-Component/Input/Input";
import axios from "axios";
import WithUser from "../HOCs/WithUser";
import WithAlert from "../HOCs/WithAlert";
import { FormikValues, User,SignProp ,Signintypes ,AlertType} from "../CommenType/Types";


type bag= {
  props:SignProp
}

const initialValues = {
  email: "",
  password: "",
};

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});
const Base_url = "https://ecommercebackend1-n7nkxlhf.b4a.run"
function Submit(values: FormikValues, bag:FormikBag<initialValueType, FormikValues>) {
  console.log("bag is sending ", bag);
  axios
    .post(Base_url+"/login", {
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



const SignIn: FC<Signintypes> = ({
  values,
  errors,
  touched,
  handleSubmit,
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
            type="submit"
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

type initialValueType = {
  email:string,
  password:string,
  setUser:(u:User)=>void,
  setAlert:(a:AlertType)=>void
}

type withFormikType = {
  initialValues:initialValueType,
  handleSubmit:()=>void;
}

const myHOC = withFormik<initialValueType ,FormikValues >({
  mapPropsToValues:()=>(initialValues),
  validationSchema: schema,
  handleSubmit: Submit,
})(SignIn);

export default WithAlert(WithUser(myHOC));
