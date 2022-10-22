import * as Yup from "yup";

const VetProfileFormSchema = Yup.object().shape({
  bio: Yup.string(),
  phone: Yup.string(),
  businessEmail: Yup.string(),
  createdBy: Yup.object().shape({
    firstName: Yup.string(),
    id: Yup.number(),
    lastName: Yup.string(),
    userImage: Yup.string(),
  }),
  modifiedBy: Yup.string(),
  isActive: Yup.boolean(),
  emergencyLine: Yup.string(),
  id: Yup.string().nullable(),
});

export default VetProfileFormSchema;
