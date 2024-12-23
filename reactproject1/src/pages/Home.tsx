import React from "react";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { EditProfileButton } from "../ui-components/EditProfileButton";

export function Home() {
  return (
    <>
      <AuthenticatedTemplate>
        <ButtonGroup orientation="vertical">
          <Button
            component={RouterLink}
            to="/profile"
            variant="contained"
            color="primary"
          >
            Request Profile Information
          </Button>
          <Button
            component={RouterLink}
            to="/example"
            variant="contained"
            color="primary"
          >
            Go To Example
          </Button>

          <EditProfileButton />
        </ButtonGroup>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Typography variant="h6" align="center">
          Please sign-in to see your profile information.
        </Typography>
      </UnauthenticatedTemplate>
    </>
  );
}
