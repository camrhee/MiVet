import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import Toast from "toastr";
import vetProfilesService from "./vetProfilesService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation } from "react-router-dom";
import VetProfileFormSchema from "./VetProfileFormSchema";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./assets/vetprofiles.css";

function VetProfileForm() {
  const _logger = debug.extend("VetProfileForm");

  const [formData, setFormData] = useState({
    bio: "",
    phone: "",
    businessEmail: "",
    modifiedBy: "",
    isActive: true,
    emergencyLine: "",
    id: null,
  });

  let { state } = useLocation();

  useEffect(() => {
    if (state && state?.type === "PROFILE_FORM") {
      setFormData((prevState) => {
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
        if (localState.services) {
          let arrayOfServices = localState.services.map((s) => ({
            serviceId: s.serviceId,
            serviceName: s.serviceName,
          }));
          pd.services = arrayOfServices;
        }
        return pd;
      });
    }
  }, [state]);

  const onSubmit = (values) => {
    _logger(values);

    if (values.id) {
      vetProfilesService
        .updateProfile(values)
        .then(onUpdateProfileSuccess)
        .catch(onUpdateProfileError);
    } else {
      vetProfilesService
        .addProfile(values)
        .then(onAddProfileSuccess)
        .catch(onAddProfileError);
      _logger(values);
    }
  };

  const onUpdateProfileSuccess = (response) => {
    Toast.success("Successfully Updated Profile");
    _logger(response);
  };
  const onUpdateProfileError = (error) => {
    Toast.error("Update Profile Unsuccessful");
    _logger(error);
  };
  const onAddProfileSuccess = (response) => {
    Toast.success("Successfully Added Profile");
    _logger(response);
  };
  const onAddProfileError = (error) => {
    Toast.error("Add Profile Unsuccessful");
    _logger(error);
  };

  const onCKChange = (setFieldValue, event, editor) => {
    _logger(event);
    const data = editor.getData();
    setFieldValue("bio", data);
  };

  return (
    <React.Fragment>
      <div className="container p-4 card">
        <Formik
          enableReinitialize={true}
          initialValues={formData}
          onSubmit={onSubmit}
          validationSchema={VetProfileFormSchema}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="col">
                <label htmlFor="exampleBio" className="form-label">
                  Bio
                </label>
                <CKEditor
                  className="ck-editor__editable_inline" 
                  editor={ClassicEditor}
                  id="bio"
                  name="bio"
                  data={formData.bio}
                  onChange={(event, editor) => {
                    onCKChange(setFieldValue, event, editor);
                  }}
                ></CKEditor>
                <ErrorMessage name="bio" component="div" />
              </div>
              <div className="mb-3 mt-3 row">
                <div className="col">
                  <label htmlFor="exampleBusinessEmail" className="form-label">
                    Business Email
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="businessEmail"
                    placeholder="Please Enter Email"
                  />
                  <ErrorMessage name="businessEmail" component="div" />
                </div>
              </div>
              <div className="mb-3 row">
                <div className="col">
                  <label htmlFor="examplePhone" className="form-label">
                    Phone
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="phone"
                    placeholder="Please Enter Phone Number"
                  />
                  <ErrorMessage name="phone" component="div" />
                </div>
                <div className="col">
                  <label htmlFor="exampleEmergencyLine" className="form-label">
                    Emergency Line
                  </label>
                  <Field
                    type="text"
                    className="form-control"
                    name="emergencyLine"
                    placeholder="Please Provide Emergency Line"
                  />
                  <ErrorMessage name="emergencyLine" component="div" />
                </div>
              </div>
              <button
                type="submit"
                className="btn-vetprofile btn-primary-vetprofile"
              >
                Submit Profile
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default VetProfileForm;
