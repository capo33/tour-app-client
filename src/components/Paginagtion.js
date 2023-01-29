import React from "react";
import { MDBPagination, MDBPaginationItem, MDBBtn } from "mdb-react-ui-kit";

const Paginagtion = ({ setCurrentPage,
  currentPage,
  numberOfPages,
  dispatch, }) => {
  const renderPagination = () => {
    // we don't want to render pagination if there is only one page
    if (currentPage === numberOfPages && currentPage === 1) return null;
    // if we are on the first page, we only want to render the next button
    if (currentPage === 1) {
      return (
        <MDBPagination center className='mb-0'>
          <MDBPaginationItem>
            <p className='fw-bold mt-1'>1</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className='mx-2'
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <MDBPagination center className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className='mx-2'
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className='fw-bold mt-1'>{currentPage}</p>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className='mx-2'
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            >
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center className='mb-0'>
          <MDBPaginationItem>
            <MDBBtn
              rounded
              className='mx-2'
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            >
              Prev
            </MDBBtn>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <p className='fw-bold mt-1'>{currentPage}</p>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };

  return <div className='mt-4'>{renderPagination()}</div>;
};

export default Paginagtion;
