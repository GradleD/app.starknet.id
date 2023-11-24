import React, { FunctionComponent } from "react";
import { isSubdomain } from "../../utils/stringService";
import { hexToDecimal } from "../../utils/feltService";
import { useAccount } from "@starknet-react/core";
import Notification from "../UI/notification";

type IdentityWarningsProps = {
  identity?: Identity;
  isIdentityADomain: boolean;
};

const IdentityWarnings: FunctionComponent<IdentityWarningsProps> = ({
  identity,
  isIdentityADomain,
}) => {
  const { address } = useAccount();
  const currentTimeStamp = new Date().getTime() / 1000;
  const isExpired =
    Number(identity?.domain_expiry) < currentTimeStamp &&
    !isSubdomain(identity?.domain);
  const showWarning =
    identity?.addr != hexToDecimal(address) &&
    identity?.owner_addr === hexToDecimal(address) &&
    Boolean(address);

  return isIdentityADomain ? (
    <>
      <Notification visible={isExpired && Boolean(address)} severity="error">
        This domain has expired. You can renew it by clicking RENEW YOUR DOMAIN.
      </Notification>
      <Notification visible={showWarning} severity="error">
        <>&nbsp;Be careful this domain is not linked to your current address.</>
      </Notification>
    </>
  ) : null;
};

export default IdentityWarnings;
