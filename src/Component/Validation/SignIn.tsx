import { withFormik ,FormikBag} from "formik";
import React, { FC, InputHTMLAttributes } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Input from "../Ui-Component/Input/Input";
import axios from "axios";
import WithUser from "../HOCs/WithUser";
import WithAlert from "../HOCs/WithAlert";
import { FormikValues, User, SignProp, Signintypes, AlertType } from "../CommenType/Types";


type bag= {
  props:SignProp
}

const initialValues = {
  username: "",
  password: "",
};

const schema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().min(8).required(),
});
function Submit(values: FormikValues, bag:FormikBag<initialValueType, FormikValues>) {
  // Use DummyJSON API for login
  axios
    .post("https://dummyjson.com/auth/login", {
      username: values.username,
      password: values.password,
    })
    .then((response) => {
      const { accessToken, id, username, email, firstName, lastName, gender, image } = response.data;
      const user: User = {
        id,
        firstName,
        lastName,
        maidenName: '',
        age: 0,
        gender,
        email,
        phone: '',
        username,
        password: '',
        birthDate: '',
        image,
        bloodGroup: '',
        height: 0,
        weight: 0,
        eyeColor: '',
        hair: { color: '', type: '' },
        domain: '',
        ip: '',
        address: {
          address: '',
          city: '',
          coordinates: { lat: 0, lng: 0 },
          postalCode: '',
          state: ''
        },
        macAddress: '',
        university: '',
        bank: {
          cardExpire: '',
          cardNumber: '',
          cardType: '',
          currency: '',
          iban: ''
        },
        company: {
          department: '',
          name: '',
          title: '',
          address: {
            address: '',
            city: '',
            coordinates: { lat: 0, lng: 0 },
            postalCode: '',
            state: ''
          }
        },
        ein: '',
        ssn: '',
        userAgent: ''
      };
      bag.props.setUser(user);
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      bag.props.setAlert({ message: "LogIn Successful", type: "success" });
    })
    .catch((e) => {
      console.error('Login error details:', e);
      console.error('Error response:', e.response?.data);
      console.error('Error status:', e.response?.status);
      console.error('Error headers:', e.response?.headers);
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
  console.log("SignIn component rendered with values:", values);
  console.log("SignIn component errors:", errors);
  console.log("SignIn component touched:", touched);
  
  return (
    <div className="shadow-xl mx-3 my-10 sm:p-20 p-4 space-y-5  text-sm font-bold bg-white text-gray-700 max-w-5xl md:mx-auto md:text-base">
      <h1 className="text-2xl ">Login</h1>
      <form
        className="p-6 flex flex-col space-y-3 border"
        onSubmit={handleSubmit}
      >
        {/* <AiOutlineUser className="text-2xl relative top-[78px] left-3 " /> */}
        <label htmlFor="username">Username *</label>
        <Input
          id="username"
          type="text"
          name={"username"}
          value={values.username}
          onChange={handleChange}
          errors={errors.username}
          touched={touched.username}
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
}

type initialValueType = {
  username:string,
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
