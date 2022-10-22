import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { Row, Col, Image, Container, Card } from "react-bootstrap";
import "./assets/vetprofiles.css";

const VetProfileCoverFull = (props) => {
  const _logger = debug.extend("VetProfileCoverFull");
  const aProfile = props.dashboardData;
  _logger(aProfile);

  const onLocalEditProfileClick = (e) => {
    e.preventDefault();
    props.onEditProfileClick(props.dashboardData);
  };

  return (
    <React.Fragment>
      <div className="py-20 background-vetprofile"></div>
      <Card className="p-lg-2 pt-2 pt-lg-0 rounded-0 border-0">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} md={8} sm={12}>
              <div className="d-flex align-items-center">
                <div className="position-relative mt-n9">
                  <Image
                    src={aProfile.createdBy.userImage}
                    alt=""
                    className="rounded-circle avatar-xxl border-white border border-4 position-relative"
                  />
                </div>
                <div className="ms-3">
                  <div className="d-flex align-items-center">
                    <h3 className="mb-0 fw-bold me-2">
                      {aProfile.createdBy?.firstName}{" "}
                      {aProfile.createdBy?.lastName}
                    </h3>
                  </div>
                  <span className="fs-6">
                    Emergency Line: {aProfile?.emergencyLine}
                  </span>
                </div>
              </div>
            </Col>
            <Col lg={4} md={4} sm={12}>
              <div className="fs-4 mt-4 mt-lg-0 pb-2 pb-lg-0 d-lg-flex justify-content-end">
                <button
                  className="btn-vetprofile btn-primary-vetprofile"
                  onClick={onLocalEditProfileClick}
                >
                  Edit Profile
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </Card>
    </React.Fragment>
  );
};

VetProfileCoverFull.propTypes = {
  dashboardData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    bio: PropTypes.string.isRequired,
    createdBy: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      userImage: PropTypes.string,
    }),
    emergencyLine: PropTypes.string.isRequired,
  }),
  onEditProfileClick: PropTypes.func.isRequired,
};

export default VetProfileCoverFull;
