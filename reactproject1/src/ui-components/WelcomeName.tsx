import React from "react";
import { useMsal, useAccount, useIsAuthenticated } from "@azure/msal-react";
import Typography from "@mui/material/Typography";
import { useLoading } from "../store/store";

const WelcomeName = () => {
  const { instance, accounts, inProgress } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const isAuthenticated = useIsAuthenticated();
  const loading = useLoading((state) => state.loading);

  if (loading === "Loading") {
    return <div>Loading</div>;
  } else if (loading === "Error") {
    return <div>There is an error</div>;
  }

  return (
    <Typography variant="h6">
      Welcome, {activeAccount?.idTokenClaims?.name ?? ""}
    </Typography>
  );
};

export default WelcomeName;
