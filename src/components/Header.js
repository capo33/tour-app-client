import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchTours } from "../redux/features/tourSlice";
import decode from "jwt-decode";

const Header = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => ({
    ...state.auth,
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    // we check if the token has expired
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      // window.location.href = `/search/${search}`;
      dispatch(searchTours(search));
      navigate(`/tours/search?searchQuery=${search}`);
      setSearch("");
    } else {
      // window.location.href = "/";
      navigate("/");
    }
  };

  const getFirstName = (name) => {
    // name.indexOf(" ") > 0 ? name.substring(0, name.indexOf(" ")) : name
    return user?.result?.name.split(" ")[0];
  };

  return (
    <MDBNavbar fixed='top' expand='lg' style={{ backgroundColor: "#f0e6ea" }}>
      <MDBContainer>
        <MDBNavbarBrand
          style={{ color: "#606080", fontWeight: "600", fontSize: "22px" }}
        >
          Mern Stack
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
            {/* {user?.result?.userName && (
              <>
                <h5 style={{ marginTop: "25px" }}>
                  Logged in as: {user?.result?.userName}
                </h5>
              </>
            )} */}
            {user?.result?.name && (
              <>
                <h5 style={{ marginTop: "25px" }}>
                  <span
                    style={{
                      marginTop: "25px",
                      marginLeft: "5px",
                      color: "blue",
                      border: "1px solid blue",
                      borderRadius: "5px",
                      padding: "5px",
                      background: "white",
                    }}
                  >
                    {getFirstName().toUpperCase()}
                  </span>
                </h5>
              </>
            )}

            <MDBNavbarItem>
              <MDBNavbarLink href='/'>
                <p className='header-text'>Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/addTour'>
                    <p className='header-text'>Add Tour</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/dashboard'>
                    <p className='header-text'>Dashboard</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user ? (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/login'>
                    <p className='header-text' onClick={handleLogout}>
                      Logout
                    </p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href='/login'>
                  <p className='header-text'>Login</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
          <form className='d-flex input-group w-auto' onSubmit={handleSubmit}>
            <input
              type='search'
              className='form-control'
              placeholder='Search Tour'
              aria-label='Search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
