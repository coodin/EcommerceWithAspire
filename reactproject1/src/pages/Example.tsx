import {  useMsal } from "@azure/msal-react";
import React, { useEffect } from "react";
const Example = () => {
  const { instance } = useMsal();
  useEffect(() => {}, []);
  console.log("account in example", instance.getActiveAccount());
  return <div className="">{"Example"}</div>;
};

export default Example;
