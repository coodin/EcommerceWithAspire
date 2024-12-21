//import { loginRequest, privateEndpointConfig } from "../authConfig";
//import { msalInstance } from "../index";

//export async function callPrivateEndpoint() {
//  const account = msalInstance.getActiveAccount();

//  // console.log("Active Account from Private Endpoint", account);

//  if (!account) {
//    throw Error(
//      "No active account! Verify a user has been signed in and setActiveAccount has been called."
//    );
//  }

//  const responseFromMSAL = await msalInstance.acquireTokenSilent({
//    ...loginRequest,
//    account: account,
//  });

//  const headers = new Headers();
//  const bearer = `Bearer ${responseFromMSAL.accessToken}`;
//  console.log(`Access Token ${responseFromMSAL.accessToken}`);

//  headers.append("Authorization", bearer);
//  headers.append("Content-Type", "application/json");

//  const options: RequestInit = {
//    //mode: "no-cors",
//    method: "GET",
//    headers: headers,

//    // credentials: "include",
//  };
//  try {
//    const response = await fetch(
//      privateEndpointConfig.authenticatedEndpointLocal,
//      options
//    );
//    if (response.ok) {
//      const data = await response.json();
//      console.log(data);
//    }
//  } catch (error) {
//    console.error(error);
//  }
//}
