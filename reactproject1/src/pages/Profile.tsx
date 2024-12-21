import React, { useEffect, useState } from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionType,
  InteractionRequiredAuthError,
  AccountInfo,
} from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

// Sample app imports
import { ProfileData } from "../ui-components/ProfileData";
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
//import { callPrivateEndpoint } from "../utils/PrivateEndpointApiCall";

// Material-ui imports
import Paper from "@mui/material/Paper";
import { useLoading } from "../store/store";
import { Button } from "@mui/material";

const ProfileContent = () => {
  const { instance, inProgress } = useMsal();

  // useEffect(() => {
  //   console.log("it has been run ");
  //   callPrivateEndpoint()
  //     .then((result) => {
  //       console.log("Result of the call", result);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  //const callAPI = () => {
  //  console.log("it has been run ");
  //  callPrivateEndpoint()
  //    .then((result) => {
  //      console.log("Result of the call", result);
  //    })
  //    .catch((err) => {
  //      console.error(err);
  //    });
  //};

  // useEffect(() => {
  //   if (!userName && inProgress === InteractionStatus.None) {
  //     callPrivateEndpoint()
  //       .then((response) => setUserName(response))
  //       .catch((e) => {
  //         if (e instanceof InteractionRequiredAuthError) {
  //           instance.acquireTokenRedirect({
  //             ...loginRequest,
  //             account: instance.getActiveAccount() as AccountInfo,
  //           });
  //         }
  //       });
  //   }
  // }, [inProgress, graphData, instance]);

  return (
    <Paper>
      {/*<ProfileData /> <Button onClick={callAPI}>Fetch Data</Button>*/}
    </Paper>
  );
};

export function Profile() {
  const authRequest = {
    ...loginRequest,
  };

  return (
    // <MsalAuthenticationTemplate
    //   interactionType={InteractionType.Redirect}
    //   authenticationRequest={authRequest}
    //   errorComponent={ErrorComponent}
    //   loadingComponent={Loading}
    // >
    <ProfileContent />
    // </MsalAuthenticationTemplate>
  );
}
