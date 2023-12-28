import { Modal, TextField } from "@mui/material";
import { useAccount, useContractWrite } from "@starknet-react/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useIsValid } from "../../../hooks/naming";
import styles from "../../../styles/components/modalMessage.module.css";
import { numberToString } from "../../../utils/stringService";
import SelectIdentity from "../../domains/selectIdentity";
import Button from "../../UI/button";
import { utils } from "starknetid.js";
import ConfirmationTx from "../../UI/confirmationTx";
import { Call } from "starknet";
import { useNotificationManager } from "../../../hooks/useNotificationManager";
import { NotificationType, TransactionType } from "../../../utils/constants";

type SubdomainModalProps = {
  handleClose: () => void;
  isModalOpen: boolean;
  callDataEncodedDomain: (number | string)[];
  domain?: string;
};

const SubdomainModal: FunctionComponent<SubdomainModalProps> = ({
  handleClose,
  isModalOpen,
  callDataEncodedDomain,
  domain,
}) => {
  const [targetTokenId, setTargetTokenId] = useState<number>(0);
  const [subdomain, setSubdomain] = useState<string>();
  const encodedSubdomain: string = utils
    .encodeDomain(subdomain)[0]
    .toString(10);
  const isDomainValid = useIsValid(subdomain);
  const [callData, setCallData] = useState<Call[]>([]);
  const { address } = useAccount();
  const { addTransaction } = useNotificationManager();
  const { writeAsync: transfer_domain, data: transferDomainData } =
    useContractWrite({
      calls: callData,
    });
  const [isTxSent, setIsTxSent] = useState(false);

  function changeTokenId(value: number): void {
    setTargetTokenId(value);
  }

  function changeSubdomain(value: string): void {
    setSubdomain(value);
  }

  useEffect(() => {
    const newTokenId: number = Math.floor(Math.random() * 1000000000000);

    if (targetTokenId != 0) {
      setCallData([
        {
          contractAddress: process.env.NEXT_PUBLIC_NAMING_CONTRACT as string,
          entrypoint: "transfer_domain",
          calldata: [
            Number(callDataEncodedDomain[0]) + 1,
            encodedSubdomain,
            ...callDataEncodedDomain.slice(1),
            targetTokenId,
          ],
        },
      ]);
    } else {
      setCallData([
        {
          contractAddress: process.env
            .NEXT_PUBLIC_STARKNETID_CONTRACT as string,
          entrypoint: "mint",
          calldata: [numberToString(newTokenId)],
        },
        {
          contractAddress: process.env.NEXT_PUBLIC_NAMING_CONTRACT as string,
          entrypoint: "transfer_domain",
          calldata: [
            Number(callDataEncodedDomain[0]) + 1,
            encodedSubdomain,
            ...callDataEncodedDomain.slice(1),
            newTokenId,
          ],
        },
      ]);
    }
  }, [targetTokenId, encodedSubdomain, callDataEncodedDomain, address]);

  useEffect(() => {
    if (!transferDomainData?.transaction_hash) return;
    addTransaction({
      timestamp: Date.now(),
      subtext: `For ${domain}`,
      type: NotificationType.TRANSACTION,
      data: {
        type: TransactionType.SUBDOMAIN_CREATION,
        hash: transferDomainData.transaction_hash,
        status: "pending",
      },
    });
    setIsTxSent(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferDomainData]); // We want to call this only once when the transaction is sent

  function closeModal(): void {
    setIsTxSent(false);
    handleClose();
  }

  return (
    <Modal
      disableAutoFocus
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {isTxSent ? (
        <ConfirmationTx
          closeModal={handleClose}
          txHash={transferDomainData?.transaction_hash}
        />
      ) : (
        <div className={styles.menu}>
          <button className={styles.menu_close} onClick={handleClose}>
            <svg viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 className={styles.menu_title}>Create a subdomain of {domain}</h2>
          <p className="mt-5">
            As you own {domain} you can create a subdomain of it using this
            form. This subdomain won&apos;t have any expiry date but the owner
            of the parent domain will always be able to redeem it.
          </p>
          <div className="mt-5 flex flex-col justify-center">
            <TextField
              fullWidth
              id="outlined-basic"
              label={
                isDomainValid != true
                  ? `"${isDomainValid}" is not a valid character`
                  : "Subdomain"
              }
              placeholder="Subdomain"
              variant="outlined"
              onChange={(e) => changeSubdomain(e.target.value)}
              color="secondary"
              required
              error={isDomainValid != true}
            />
            <SelectIdentity
              tokenId={targetTokenId}
              changeTokenId={changeTokenId}
            />
            <div className="mt-5 flex justify-center">
              <Button
                disabled={
                  Boolean(!subdomain) || typeof isDomainValid === "string"
                }
                onClick={() => transfer_domain()}
              >
                Create subdomain
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SubdomainModal;
