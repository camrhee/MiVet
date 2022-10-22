const VetProfiles = lazy(() => import("../components/vetProfiles/VetProfiles"));
const VetProfileDetails = lazy(() => import("../components/vetProfiles/VetProfileView"));
const VetProfilesForm = lazy(() => import("../components/vetProfiles/VetProfileForm"));

const vetProfiles = [
  {
    path: "/vetprofiles",
    name: "VetProfiles",
    exact: true,
    element: VetProfiles,
    roles: ["Admin", "Vet"],
    isAnonymous: false,
  },
  {
    path: "/vetprofiles/:id/edit",
    name: "VetProfilesForm",
    exact: true,
    element: VetProfilesForm,
    roles: ["Admin", "Vet"],
    isAnonymous: false,
  },
  {
    path: "/vetprofiles/add",
    name: "VetProfileDetails",
    exact: true,
    element: VetProfilesForm,
    roles: ["Admin", "Vet"],
    isAnonymous: false,
  },
  {
    path: "/vetprofiles/:id",
    name: "VetProfileDetails",
    exact: true,
    element: VetProfileDetails,
    roles: ["Admin", "Vet"],
    isAnonymous: false,
  },
];

const allRoutes = [...vetProfiles];

export default allRoutes;
