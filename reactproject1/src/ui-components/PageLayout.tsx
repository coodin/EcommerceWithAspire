import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import NavBar from "./NavBar";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import {
  InteractionRequiredAuthError,
  InteractionStatus,
  SilentRequest,
} from "@azure/msal-browser";
import isAccount from "../utils/Helper";
import { useLoading } from "../store/store";

type Props = {
  children?: React.ReactNode;
};

export const PageLayout: React.FC<Props> = ({ children }) => {
  const { instance, accounts, inProgress } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const isAuthenticated = useIsAuthenticated();
  //const [loading, setLoading] = useState<LoadingStates>("Loading");
  const loading = useLoading((state) => state.loading);
  const setLoading = useLoading((state) => state.setLoading);

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  useEffect(() => {
    console.log("activeAccount", activeAccount);
  }, [activeAccount]);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading("Started");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const authRequest: SilentRequest = {
      ...loginRequest,
    };

    if (isAuthenticated && inProgress === InteractionStatus.None) {
      instance
        .acquireTokenSilent(authRequest)
        .then((authResult) => {
          // if (isAccount(authResult)) {
          console.log("acquireTokenSilent authResult", authResult);
          //Please send this loading logic to zustand to make it more clear that the access token has been captured by acquireTokenSilent method
          setLoading("Finsihed");
          // }
        })
        .catch(async (error) => {
          setLoading("Error");
          console.log(error);

          if (error instanceof InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails
            console.log("Error inside ", error);

            try {
              await instance.acquireTokenRedirect(authRequest);
            } catch (error) {
              console.error("acquireTokenRedirect has been failed");
            }
          }
        });
    }
  }, [inProgress, isAuthenticated, accounts, instance]);
  return (
    <>
      <NavBar />
      <Typography variant="h5" align="center">
        Welcome to the Microsoft Authentication Library For React Quickstart
      </Typography>
      <br />
      <br />
      {children}
    </>
  );
};
