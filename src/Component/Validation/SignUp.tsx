import {  withFormik } from "formik";
import React, { memo ,FC} from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Input from "../Ui-Component/Input/Input";
import axios from "axios";
import WithUser from "../HOCs/WithUser";
import WithAlert from "../HOCs/WithAlert";
import { SignUptypes,valuesType,SignProp } from "../CommenType/Types"

const initialValues = {
  FULLNAME: "",
  EMAIL: "",
  USERNAME: "",
  PASSWORD: "",
  CONFIRM: "",
};

type BagType ={
  props:SignProp
}

function submit(values:valuesType ,bag:BagType) {

  console.log("🚀 ~ file: SignUp.tsx ~ line 27 ~ submit ~ bag", bag)
  
  axios.post("https://myeasykart.codeyogi.io/signup",{fullName:values.FULLNAME,email:values.EMAIL,password:values.PASSWORD}).then((response)=>{
    const {user , token}=response.data;
    bag.props.setUser(user);
    localStorage.setItem("token",token);
    bag.props.setAlert({message:'Account Created Successful' , type:'success'})
  }).catch((e)=>{
    bag.props.setAlert({message:'Account not created' , type:'error'})
  })
}

const schema = Yup.object().shape({
  FULLNAME: Yup.string().required(),
  EMAIL: Yup.string().required(),
  USERNAME: Yup.string().required(),
  PASSWORD: Yup.string().min(8).required(),
  CONFIRM: Yup.string().min(8).required().oneOf([Yup.ref('PASSWORD') ,null ] ,"Password Must Match" ),
});

const SignUp:FC<SignUptypes> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  touched,
  errors,
  values,
  
})=> {
  return (
    <div className="">
      <div className="mx-3 my-10 max-w-5xl sm:mx-10 md:mx-auto space-y-5 p-4 sm:p-20 bg-white">
        <h1 className="text-2xl">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-3 text-sm border p-6"
        >
          <Input
            placeholder="FULL NAME"
            type="text"
            name="FULLNAME"
            value={values.FULLNAME}
            onChange={handleChange}
            touched={touched.FULLNAME}
            onBlur={handleBlur}
            errors={errors.FULLNAME}
          />

          <Input
            type="email"
            name="EMAIL"
            value={values.EMAIL}
            onChange={handleChange}
            touched={touched.EMAIL}
            onBlur={handleBlur}
            placeholder="ENTER THE EMAIL"
            errors={errors.EMAIL}
            
          />

          <Input
            type="text"
            name="USERNAME"
            value={values.USERNAME}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="USERNAME"
            errors={errors.USERNAME}
            touched={touched.USERNAME}
          />

          <Input
            type="password"
            name="PASSWORD"
            value={values.PASSWORD}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="ENTER THE PASSWORD"
            errors={errors.PASSWORD}
            touched={touched.PASSWORD}
          />

          <Input
            type="password"
            name="CONFIRM"
            value={values.CONFIRM}
            onChange={handleChange}
            placeholder="CONFIRM PASSWORD"
            className="px-4 py-2 border"
            onBlur={handleBlur}
            errors={errors.CONFIRM}
            touched={touched.CONFIRM}
          />

          <button
            type="submit"
            className="px-4 py-2 bg-red-500 font-bold text-white text-xl"
          >
            SignUp
          </button>
          <Link to="/component/validation/SignIn" className="text-red-500">
            Already Have an Account ?
          </Link>
        </form>
      </div>
    </div>
  );
}

const myHoc = withFormik({
  validationSchema: schema,
  mapPropsToValues:()=>(initialValues),
  handleSubmit: submit,
});
const Signup = myHoc(SignUp);

export default WithAlert(WithUser(Signup));
