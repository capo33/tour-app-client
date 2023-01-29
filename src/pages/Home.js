import React, { useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getTours, setCurrentPage } from "../redux/features/tourSlice";
import CardTour from "../components/CardTour";
import Spinner from "../components/Spinner";
import Paginagtion from "../components/Paginagtion";

// useQuery hook
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const { tours, isLoading, currentPage, numberOfPages } = useSelector(
    (state) => ({ ...state.tour })
  );
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  useEffect(() => {
    dispatch(getTours(currentPage));
  }, [dispatch, currentPage]);

  if (isLoading) {
    return (
      // <MDBContainer className='mt-5'>
      //   <MDBRow className='justify-content-center'>
      //     <MDBCol md='6'>
      //       <MDBTypography tag='h1' variant='h1' className='text-center'>
      //         Loading...
      //       </MDBTypography>
      //     </MDBCol>
      //   </MDBRow>
      // </MDBContainer>
      <Spinner />
    );
  }
  return (
    <div
      style={{
        margin: " auto",
        marginTop: " 3rem",
        padding: "15px",
        maxwidth: "1000px",
        alignContent: "center",
      }}
    >
      <MDBRow className='mt-5'>
        {/* we are hear in home page */}
        {tours.length === 0 && location.pathname === "/" && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            No Tours Found
          </MDBTypography>
        )}
        {/* we are hear in search page */}
        {tours.length === 0 && location.pathname !== "/" && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            We couldn't find any tours matching your search '{searchQuery}'
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className='row-cols-1 row-cols-md-3 g-2'>
              {tours &&
                tours.map((tour) => <CardTour key={tour._id} {...tour} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
      {tours.length > 0 && (
        <Paginagtion
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Home;
