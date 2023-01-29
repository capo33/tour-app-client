import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../redux/features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    }
    if (firstName && lastName && email && password && confirmPassword) {
      dispatch(
        register({
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
        <h5>Sign Up</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className='col-md-6'>
              <MDBInput
                label='First Name'
                type='text'
                value={firstName}
                name='firstName'
                onChange={onInputChange}
                required
                invalid='true'
                validation='Please provide your first name.'
              />
            </div>
            <div className='col-md-6'>
              <MDBInput
                label='Last Name'
                type='text'
                value={lastName}
                name='lastName'
                onChange={onInputChange}
                required
                invalid='true'
                validation='Please provide your last name.'
              />
            </div>
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
            <div className='col-md-12'>
              <MDBInput
                label='Confirm Password'
                type='password'
                value={confirmPassword}
                name='confirmPassword'
                onChange={onInputChange}
                required
                invalid='true '
                validation='Please confirm your password'
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
                Register
              </MDBBtn>
            </div>
          </MDBValidation>
          {/* <br /> */}
          {/* <GoogleLogin
          clientId="Your Client Id"
          render={(renderProps) => (
            <MDBBtn
              style={{ width: "100%" }}
              color="danger"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <MDBIcon className="me-2" fab icon="google" /> Google Sign In
            </MDBBtn>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy="single_host_origin"
        /> */}
        </MDBCardBody>
        <MDBCardFooter>
          <Link to='/login'>
            <p>Already have an account? Sign In</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
