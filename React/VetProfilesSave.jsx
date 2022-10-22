import React, { useState, useEffect } from "react";
import vetProfilesService from "./vetProfilesService";
import debug from "sabio-debug";
import { Col, Row, Tab, Form, Breadcrumb } from "react-bootstrap";
import VetProfileCard from "./VetProfileCard";
import { useNavigate } from "react-router-dom";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import "./assets/vetprofiles.css";
import Toast from "toastr";

function VetProfiles() {
  const _logger = debug.extend("VetProfiles");
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  const [profiles, setProfiles] = useState({
    arrayOfProfiles: [],
    profileComponents: [],
  });

  useEffect(() => {
    vetProfilesService
      .getAllPaginated(0, 8)
      .then(onGetProfilesSucess)
      .catch(onGetProfilesError);
  }, []);

  const onGetProfilesSucess = (data) => {
    let arrayOfPaginatedProfiles = data.item.pagedItems;
    _logger({ arrayOfPaginatedProfiles });

    setProfiles((prevstate) => {
      const pd = { ...prevstate };
      pd.arrayOfProfiles = arrayOfPaginatedProfiles;
      pd.profileComponents = arrayOfPaginatedProfiles.map(mapProfile);
      return pd;
    });
    setPageData((prevState) => {
      return {
        ...prevState,
        totalCount: data.item.totalCount,
      };
    });
  };

  const onGetProfilesError = (error) => {
    _logger(error);
  };

  const handleNavtoAdd = (e) => {
    e.preventDefault();
    navigate("/vetprofiles/add");
  };

  const onViewDetailsClick = (aProfile) => {
    _logger(aProfile.id, { aProfile });
    const stateForTransport = { type: "PROFILE_VIEW", payload: aProfile };
    _logger(stateForTransport);
    navigate(`/vetprofiles/${aProfile.id}`, {
      state: stateForTransport,
    });
  };

  const mapProfile = (aProfile) => {
    return (
      <VetProfileCard
        key={"Unique Key Id:" + aProfile.id}
        profile={aProfile}
        onViewDetailClick={onViewDetailsClick}
      />
    );
  };

  const onGetAllProfileChange = (page) => {
    setPageData((prevState) => {
      const profileView = { ...prevState };
      profileView.current = page;
      profileView.pageIndex = profileView.current - 1;
      return profileView;
    });
    vetProfilesService
      .getAllPaginated(page - 1, 8)
      .then(onGetProfilesSucess)
      .catch(onGetProfilesError);
  };

  const onSearchProfileChange = (page) => {
    setPageData((prevState) => {
      const profileView = { ...prevState };
      profileView.current = page;
      profileView.pageIndex = profileView.current - 1;
      return profileView;
    });
    vetProfilesService
      .search(page - 1, 8, query)
      .then(onSearchProfilesClickSuccess)
      .catch(onSearchProfilesClickError);
  };

  const [pageData, setPageData] = useState({
    arrayOfProfilePage: [],
    profilePageComponents: [],
    pageIndex: 0,
    pageSize: 8,
    totalCount: 0,
    current: 1,
  });

  const navToDash = (e) => {
    e.preventDefault();
    navigate("/dashboard/analytics");
  };

  const [query, setQuery] = useState("");

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSearchProfilesClick = (e) => {
    e.preventDefault();
    vetProfilesService
      .search(0, 8, query)
      .then(onSearchProfilesClickSuccess)
      .catch(onSearchProfilesClickError);
    setShow(false);
  };

  const onSearchProfilesClickSuccess = (data) => {
    _logger("Search Results", data.item.pagedItems);
    const searchedProfiles = data.item.pagedItems;

    setProfiles((prevstate) => {
      const pd = { ...prevstate };
      pd.arrayOfProfiles = searchedProfiles;
      pd.profileComponents = searchedProfiles.map(mapProfile);
      return pd;
    });
    setPageData((prevState) => {
      return {
        ...prevState,
        totalCount: data.item.totalCount,
      };
    });
  };

  const onSearchProfilesClickError = (error) => {
    _logger(error);
    Toast.error("No search results found");
  };

  const onResetClick = () => {
    vetProfilesService
      .getAllPaginated(0, 8)
      .then(onGetProfilesSucess)
      .catch(onGetProfilesError);
    setShow(true);
    setQuery("");
  };

  return (
    <React.Fragment>
      <Tab.Container defaultActiveKey="grid">
        <Row>
          <div>
            <Breadcrumb className="floaty-right-vetprofile">
              <Breadcrumb.Item onClick={navToDash}>Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item active>Vet Profile</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="mb-1 h2 fw-bold">
              Vet Profile{" "}
              <span className="fs-5 text-muted">
                ({profiles.arrayOfProfiles.length})
              </span>
            </h1>
            <button
              className="btn-vetprofile btn-primary-vetprofile"
              style={{ margin: 7 }}
              onClick={handleNavtoAdd}
            >
              Add Profile
            </button>
          </div>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0"></div>
            </div>
          </Col>
        </Row>
        <div className="mb-4 row">
          <Col className="align-vertical-children-vetprofile">
            <Form.Control
              className="form-control-vetprofile"
              type="text"
              placeholder="Search by Name or Location"
              onChange={onChange}
            />
            <button
              className="btn-vetprofile btn-primary-vetprofile floaty-right-vetprofile"
              style={{ margin: 7 }}
              onClick={onSearchProfilesClick}
            >
              Search
            </button>
            <button
              className="btn-vetprofile btn-primary-vetprofile floaty-right-vetprofile"
              style={{ margin: 7 }}
              onClick={onResetClick}
            >
              Reset
            </button>
          </Col>
        </div>
        <div className="row">{profiles.profileComponents}</div>
        {show ? (
          <Pagination
            className="align-items-center g-0 mt-4 "
            onChange={onGetAllProfileChange}
            current={pageData.current}
            total={pageData.totalCount}
            pageSize={pageData.pageSize}
            pageIndex={pageData.pageIndex}
            locale={locale}
            style={{ textAlign: "center" }}
          />
        ) : (
          <Pagination
            className="align-items-center g-0 mt-4 "
            onChange={onSearchProfileChange}
            current={pageData.current}
            total={pageData.totalCount}
            pageSize={pageData.pageSize}
            pageIndex={pageData.pageIndex}
            locale={locale}
            style={{ textAlign: "center" }}
          />
        )}
      </Tab.Container>
    </React.Fragment>
  );
}

export default VetProfiles;
