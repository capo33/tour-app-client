import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { GoogleLogin } from "@react-oauth/google";
// import { useGoogleLogin } from "@react-oauth/google";

import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
} from "mdb-react-ui-kit";

import { login } from "../redux/features/authSlice";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
   useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(
        login({
          formData,
          navigate,
          toast,
        })
      );
    }

   };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const googleSuccess = async (response) => {
  //   const decoded = jwt_decode(response.credential);
  //   console.log(decoded);
  //   const { email, name, sub, picture } = decoded;

  //   const result = {
  //     _id: sub,
  //     type: "user",
  //     userName: name,
  //     imageUrl: picture,
  //     email,
  //   };
  //   const token = response.credential;
  //   console.log("result: ", result);
  //   console.log("token: ", token);
  //   try {
  //     dispatch(login({ result, token }));
  //     // navigate("/");
  //     // toast.success("Login successful");
  //     localStorage.setItem("profile", JSON.stringify({ result: result }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const googleSuccess = async (response) => {
  //   const decoded = jwt_decode(response.credential);
  //   console.log(decoded);
  //   const { name, sub, picture, email } = decoded;

  //   const result = {

  //     _id: sub,
  //     type: "user",
  //     userName: name,
  //     email: email,
  //     imageUrl: picture,
  //   };
  //   const token = response.credential;
  //   console.log("result: ", result);
  //   console.log("token: ", token);
  //   try {
  //     dispatch(googleLogin({ result, token, navigate, toast }));
  //     navigate("/");
  //     toast.success("Login successful");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const googleFailure = (error) => {
  //   console.log(`Google login failed: ${error}`);
  // };
  // const googleSuccess = async (res) => {
  //   console.log(res);
  //   // const result = res?.profileObj;
  // };

  // const googleFailure = () => {
  //   console.log("Google Sign In was unsuccessful. Try again later");
  // };

  return (
    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px",
      }}
    >
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle' className='fa-2x' />
        <h5>Sign In</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className='col-md-12'>
              <MDBInput
                label='Email'
                type='email'
                value={email}
                name='email'
                onChange={onInputChange}
                required
                invalid='true'
                validation='Please provide your email'
              />
            </div>
            <div className='col-md-12'>
              <MDBInput
                label='Password'
                type='password'
                value={password}
                name='password'
                onChange={onInputChange}
                required
                invalid='true '
                validation='Please provide your password'
              />
            </div>
            <div className='col-12'>
              <MDBBtn style={{ width: "100%" }} className='mt-2'>
                {isLoading && (
                  <MDBSpinner
                    // grow
                    size='sm'
                    role='statu'
                    tag='span'
                    className='me-2'
                  />
                )}
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
          <br />
          {/* <GoogleLogin
            render={(renderProps) => (
              <MDBBtn
                style={{ width: "100%" }}
                color='danger'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <MDBIcon className='me-2' fab icon='google' /> Google Sign In
              </MDBBtn>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          /> */}
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/register'>
            <p>Don't have an account ? Sign Up</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;
