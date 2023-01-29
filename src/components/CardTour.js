import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likeTour } from "../redux/features/tourSlice";

const CardTour = ({
  imageFile,
  description,
  title,
  name,
  tags,
  _id,
  likes,
}) => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  const userId = user?.result?._id;
  
  const dispatch = useDispatch();
  
  const getFirstName = (name) => {
    // name.indexOf(" ") > 0 ? name.substring(0, name.indexOf(" ")) : name
    return name.split(" ")[0];
  };

  const excerpt = (str) => {
    if (str.length > 25) {
      str = str.substring(0, 25) + " ...";
    }
    return str;
  };

  // Like Component
  // const Like = () => {
  //   return (
  //     <>
  //       <MDBIcon far icon='thumbs-up' />
  //       &nbsp; {likes.length} {likes.length > 1 ? "Likes" : "Like"}
  //     </>
  //   );
  // };
  // const Like = () => {
  //   return (
  //     <>
  //       <MDBIcon far icon='thumbs-up' />
  //       &nbsp; {likes.length} {likes.length > 1 ? "Likes" : "Like"}
  //     </>
  //   );
  // };
  const Like = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <MDBIcon fas icon='thumbs-up' />
          &nbsp;
          {likes.length > 2 ? (
            <MDBTooltip
              tag='a'
              title={`You and ${likes.length - 1} other people likes`}
            >
              {likes.length} Likes
            </MDBTooltip>
          ) : (
            `${likes.length} Like${likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <MDBIcon far icon='thumbs-up' />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <MDBIcon far icon='thumbs-up' />
        &nbsp;Like
      </>
    );
  };
  const handleLike = () => {
    dispatch(likeTour({ _id }));
  };
  return (
    <MDBCardGroup className='mb-5'>
      <MDBCard className='h-100 mt-2 d-sm-flex' style={{ maxWidth: "20rem" }}>
        <MDBCardImage
          src={
            imageFile
              ? imageFile
              : "https://mdbootstrap.com/img/new/standard/nature/184.jpg"
          }
          alt={"..." + title}
          position='top'
          style={{ height: "180px", maxWidth: "100%" }}
        />
        <div className='top-left'>{getFirstName(name)}</div>
        <span className='text-start tag-card'>
          {/* {tags && tags.map((tag) => `#${tag} `)} */}
          {tags &&
            tags.map((tag, index) => (
              <Link to={`/tours/tag/${tag}`} key={index}>
                #{tag}{" "}
              </Link>
            ))}
          <MDBBtn
            style={{ float: "right" }}
            color='none'
            tag='a'
            onClick={!userId?.result ? handleLike : null}
          >
            {!user?.result ? (
              <MDBTooltip tag='a' title='You need to login to like'>
                <Like />
              </MDBTooltip>
            ) : (
              <Like />
            )}
            {/* <Like /> */}
          </MDBBtn>
        </span>
        <MDBCardBody>
          <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
          <MDBCardText className='text-start'>
            {excerpt(description)}
          </MDBCardText>
          <Link to={`/tour/${_id}`}>Read More</Link>
        </MDBCardBody>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default CardTour;
