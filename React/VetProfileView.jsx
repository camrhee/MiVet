import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import VetProfileCoverFull from "./VetProfileCoverFull";
import debug from "sabio-debug";
import vetProfilesService from "./vetProfilesService";
import * as DOMPurify from "dompurify";

function VetProfileView() {
  const _logger = debug.extend("VetProfileView");
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [dashboardData, setDashBoardData] = useState({
    bio: "",
    phone: "",
    businessEmail: "",
    createdBy: {},
    modifiedBy: "",
    isActive: true,
    emergencyLine: "",
    services: [""],
    id: null,
  });

  useEffect(() => {
    if (state && state?.type === "PROFILE_VIEW") {
      setDashBoardData((prevState) => {
        let localState = state.payload;
        let pd = { ...prevState };
        pd.id = localState.id;
        pd.bio = localState.bio;
        pd.phone = localState.phone;
        pd.businessEmail = localState.businessEmail;
        pd.createdBy = localState.createdBy;
        pd.modifiedBy = localState.modifiedBy;
        pd.isActive = localState.isActive;
        pd.emergencyLine = localState.emergencyLine;
        pd.services = [];
        pd.serviceTypes = localState.serviceTypes;
        pd.practices = [];
        pd.location = localState.location;
        if (localState.services) {
          let arrayOfServices = localState.services.map((s) => ({
            serviceId: s.serviceId,
            serviceName: s.serviceName,
            serviceTypeId: s.serviceTypeId,
          }));
          pd.services = arrayOfServices;
        }
        if (localState.practices) {
          let arrayOfPractices = localState.practices.map((p) => ({
            practiceId: p.practiceId,
            practiceName: p.practiceName,
            practicePhone: p.practicePhone,
            practiceBusinessEmail: p.practiceBusinessEmail,
            practiceSiteUrl: p.practiceSiteUrl,
          }));
          pd.practices = arrayOfPractices;
        }
        return pd;
      });
    } else {
      vetProfilesService
        .getById(id)
        .then(onGetByIdSuccess)
        .catch(onGetByIdError);
    }
  }, [state]);

  const onGetByIdSuccess = (data) => {
    _logger("Axios Call", data);

    if (id) {
      setDashBoardData((prevState) => {
        let localState = data.item;
        let pd = { ...prevState };
        pd.id = localState.id;
        pd.bio = localState.bio;
        pd.phone = localState.phone;
        pd.businessEmail = localState.businessEmail;
        pd.createdBy = localState.createdBy;
        pd.modifiedBy = localState.modifiedBy;
        pd.isActive = localState.isActive;
        pd.emergencyLine = localState.emergencyLine;
        pd.services = [];
        pd.serviceTypes = localState.serviceTypes;
        pd.location = localState.location;
        if (localState.services) {
          let arrayOfServices = localState.services.map((s) => ({
            serviceId: s.serviceId,
            serviceName: s.serviceName,
            serviceTypeId: s.serviceTypeId,
          }));
          pd.services = arrayOfServices;
        }
        if (localState.practices) {
          let arrayOfPractices = localState.practices.map((p) => ({
            practiceId: p.practiceId,
            practiceName: p.practiceName,
            practicePhone: p.practicePhone,
            practiceBusinessEmail: p.practiceBusinessEmail,
            practiceSiteUrl: p.practiceSiteUrl,
          }));
          pd.practices = arrayOfPractices;
        }
        return pd;
      });
    }
  };
  const onGetByIdError = (error) => {
    _logger(error);
  };

  _logger(dashboardData);

  const renderServices = () => {
    return dashboardData.services.map((s) => {
      return <div key={`a_service_${s.serviceId}`}>{s.serviceName}</div>;
    });
  };

  const onEditProfileClicked = (aProfile) => {
    _logger(aProfile.id, { aProfile });
    const stateForTransport = { type: "PROFILE_FORM", payload: aProfile };
    _logger(stateForTransport);
    navigate(`/vetprofiles/${dashboardData.id}/edit`, {
      state: stateForTransport,
    });
  };

  const renderPractices = () => {
    return dashboardData.practices.map((p) => {
      return <div key={`a_practice_${p.practiceId}`}>{p.practiceName}</div>;
    });
  };

  const clean = DOMPurify.sanitize(dashboardData?.bio);

  return (
    <React.Fragment>
      <VetProfileCoverFull
        dashboardData={dashboardData}
        onEditProfileClick={onEditProfileClicked}
      />

      <div className="py-5 py-md-5">
        <Container>
          <Row>
            <Col lg={3} md={4} sm={12}>
              <Card className="border-0 mb-4">
                <Card.Body className="card-body-vetprofile">
                  <h4>About me</h4>
                  <div dangerouslySetInnerHTML={{ __html: clean }}></div>
                  <Link to="#" className="btn-link">
                    {" "}
                    Read more
                  </Link>
                </Card.Body>
              </Card>
              <Card className="border-0 mb-4 mb-lg-0">
                <Card.Body className="card-body-vetprofile">
                  <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                    <div>
                      <p className="mb-0 fw-bold">Services</p>
                      <span className="fs-6 mb-0">
                        {dashboardData.services && renderServices()}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                    <div>
                      <p className="mb-0 fw-bold">Contact</p>
                      <p className="fs-6 mb-0">{dashboardData.businessEmail}</p>
                      <p className="fs-6 mb-0">{dashboardData.phone}</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mt-3">
                    <div>
                      <p className="mb-0 fw-bold">Address</p>
                      <p className="fs-6 mb-0">
                        {dashboardData?.location?.lineOne},{" "}
                        {dashboardData?.location?.city},{" "}
                        {dashboardData?.location?.state.name},{" "}
                        {dashboardData?.location?.zip}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <div>
                      <p className="mb-0 fw-bold">Practice</p>
                      <span className="fs-6 mb-0">
                        {dashboardData.practices && renderPractices()}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default VetProfileView;
