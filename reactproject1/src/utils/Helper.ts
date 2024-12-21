import { AccountInfo, EventPayload } from "@azure/msal-browser";

function isAccount(payload: EventPayload): payload is AccountInfo {
  return (payload as AccountInfo) != null;
}

export default isAccount;
