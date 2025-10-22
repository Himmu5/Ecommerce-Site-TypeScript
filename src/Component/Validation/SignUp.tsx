import {  withFormik } from "formik";
import React, { memo ,FC} from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Input from "../Ui-Component/Input/Input";
import axios from "axios";
import WithUser from "../HOCs/WithUser";
import WithAlert from "../HOCs/WithAlert";
import { SignUptypes,valuesType,SignProp, User } from "../CommenType/Types"

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
  // Use DummyJSON API for user creation
  axios.post("https://dummyjson.com/users/add", {
    firstName: values.FULLNAME.split(' ')[0] || values.FULLNAME,
    lastName: values.FULLNAME.split(' ').slice(1).join(' ') || '',
    email: values.EMAIL,
    username: values.USERNAME,
    password: values.PASSWORD
  }).then((response) => {
    const user = response.data;
    // For DummyJSON, we need to login after registration to get token
    return axios.post("https://dummyjson.com/user/login", {
      username: values.USERNAME,
      password: values.PASSWORD
    });
  }).then((loginResponse) => {
    const { accessToken, id, username, email, firstName, lastName, gender, image } = loginResponse.data;
    const user: User = {
      id,
      firstName,
      lastName,
      maidenName: '',
      age: 0,
      gender: '',
      email,
      phone: '',
      username: values.USERNAME,
      password: '',
      birthDate: '',
      image: '',
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
    localStorage.setItem("user", JSON.stringify(user)); // Store user data for UserProvider
    bag.props.setAlert({message:'Account Created Successfully' , type:'success'})
  }).catch((e) => {
    console.error('Registration error:', e);
    bag.props.setAlert({message:'Account not created. Please try again.' , type:'error'})
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
