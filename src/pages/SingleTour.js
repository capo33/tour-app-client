import React, { useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBContainer,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import moment from "moment";
import { useParams , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getRelatedTours, getTour } from "../redux/features/tourSlice";
import Spinner from "../components/Spinner";
import RelatedTours from "../components/RelatedTours";

const SingleTour = () => {
  const { tourId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tour, isLoading , relatedTours} = useSelector((state) => ({ ...state.tour }));
  const tags = tour?.tags;
  console.log(tags);

  useEffect(() => {
    tags && dispatch(getRelatedTours(tags));
  }, [dispatch, tags]);

  useEffect(() => {
    dispatch(getTour(tourId));
  }, [dispatch, tourId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <MDBContainer>
        <MDBCard className='mb-3 mt-2'>
          <MDBCardImage
            src={
              tour?.imageFile
                ? tour.imageFile
                : "https://mdbootstrap.com/img/new/standard/nature/184.jpg"
            }
            alt={"..." + tour?.title}
            position='top'
            style={{ height: "600px", maxWidth: "100%" }}
          />

          <MDBCardBody>
            <MDBBtn
              tag='a'
              color='none'
              style={{ float: "left", color: "red" }}
              onClick={() => navigate('/')}
            >
              <MDBIcon
                fas
                size='lg'
                icon='long-arrow-alt-left'
                style={{ float: "left" }}
              />
            </MDBBtn>
            <h3>{tour.title}</h3>
            <span>
              <p className='text-start tourName'>Created By: {tour.name}</p>
            </span>
            <div style={{ float: "left" }}>
              <span className='text-start'>
                {tour && tour.tags && tour.tags.map((item) => `#${item} `)}
              </span>
            </div>
            <br />
            <MDBCardText className='text-start mt-2'>
              <MDBIcon
                style={{ float: "left", margin: "5px" }}
                far
                icon='calendar-alt'
                size='lg'
              />
              <small className='text-muted'>
                {moment(tour.createdAt).fromNow()}
              </small>
            </MDBCardText>
            <MDBCardText className='lead mb-0 text-start'>
              {tour.description}
            </MDBCardText>
          </MDBCardBody>
            <RelatedTours relatedTours={relatedTours} tourId={tourId} key={tourId} />
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default SingleTour;
