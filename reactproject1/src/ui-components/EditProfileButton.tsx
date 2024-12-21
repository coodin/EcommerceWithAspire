import React from "react";
import { InteractionStatus } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import { b2cPolicies } from "../authConfig";

export const EditProfileButton = () => {
  const isAuthenticated = useIsAuthenticated();
  const { inProgress, instance } = useMsal();

  const handleProfileEdit = () => {
    if (isAuthenticated && inProgress === InteractionStatus.None) {
      instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile);
    }
  };

  return (
    <Button
      id="editProfileButton"
      variant="contained"
      color="primary"
      onClick={handleProfileEdit}
    >
      Edit Profile
    </Button>
  );
};
