import React from "react";
import PropTypes, { shape } from "prop-types";
import debug from "sabio-debug";
import { Col, Card, Image } from "react-bootstrap";

function VetProfileCard(props) {
  const _logger = debug.extend("VetProfileCard");
  const aProfile = props.profile;
  _logger(aProfile);

  const onLocalViewDetailsClick = (e) => {
    e.preventDefault();
    props.onViewDetailClick(props.profile);
  };

  const renderServices = () => {
    var names = aProfile.services.map((s) => s.serviceName);
    var content = names.join(" • ");
    return <div>{content}</div>;
  };

  return (
    <Col xl={3} lg={6} md={6} sm={12} key={aProfile.id}>
      <Card className="mb-5">
        <Card.Body className="card-body-vetprofile">
          <div className="text-center">
            <Image
              src={aProfile.createdBy.userImage}
              className="rounded-circle avatar-xl mb-3"
              alt=""
            />
            <h4 className="">
              {aProfile.createdBy.firstName} {aProfile.createdBy.lastName}
            </h4>
          </div>
          <div className="d-flex justify-content-between border-bottom">
            <span className="text-dark text-align-center-vetprofile mb-2">
              {aProfile.services && renderServices()}
            </span>
          </div>
          <div className="d-flex justify-content-between mt-2 ">
            <span className="text-dark text-align-center-vetprofile mb-3">
              {aProfile.location.lineOne} {aProfile.location.city}{" "}
              {aProfile.location.state.name} {aProfile.location.zip}
            </span>
          </div>
          <div className="text-center justify-content-between">
            <button
              className="btn-vetprofile btn-primary-vetprofile"
              onClick={onLocalViewDetailsClick}
            >
              View More Details
            </button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

VetProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number,
    bio: PropTypes.string.isRequired,
    skills: PropTypes.shape({
      serviceName: PropTypes.string.isRequired,
    }),
    createdBy: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      userImage: PropTypes.string.isRequired,
    }),
    services: PropTypes.arrayOf(
      PropTypes.shape({
        serviceId: PropTypes.number,
        serviceName: PropTypes.string,
      })
    ),
    location: PropTypes.shape({
      id: PropTypes.number,
      lineOne: PropTypes.string,
      lineTwo: PropTypes.string,
      zip: PropTypes.string,
      city: PropTypes.string,
      state: shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
  }),
  onViewDetailClick: PropTypes.func.isRequired,
};

export default React.memo(VetProfileCard);
