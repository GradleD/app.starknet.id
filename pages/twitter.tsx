import React, { useState, useEffect } from "react";
import homeStyles from "../styles/Home.module.css";
import { useAccount, useSendTransaction } from "@starknet-react/core";
import { useRouter } from "next/router";
import ErrorScreen from "../components/UI/screens/errorScreen";
import VerifyFirstStep from "../components/verify/verifyFirstStep";
import identityChangeCalls from "../utils/callData/identityChangeCalls";
import { useNotificationManager } from "../hooks/useNotificationManager";
import { NotificationType, TransactionType } from "../utils/constants";
import TxConfirmationModal from "../components/UI/txConfirmationModal";

const Twitter = () => {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const routerCode: string = router.query.code as string;
  const [signRequestData, setSignRequestData] = useState<any>();
  const { addTransaction } = useNotificationManager();
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);

  // Access localStorage
  const [tokenId, setTokenId] = useState<string>("");
  const [calls, setCalls] = useState<any>(null); // Use any or a specific type for calls

  useEffect(() => {
    const storedTokenId = window.sessionStorage.getItem("tokenId");
    if (storedTokenId) {
      setTokenId(storedTokenId);
    }
  }, []);

  useEffect(() => {
    if (!signRequestData) return;
    if (signRequestData.status === "error") {
      setScreen("error");
      return;
    }

    const newCalls = identityChangeCalls.writeVerifierData(
      process.env.NEXT_PUBLIC_VERIFIER_CONTRACT as string,
      tokenId,
      signRequestData.timestamp,
      "twitter",
      signRequestData.user_id,
      [signRequestData.sign0, signRequestData.sign1]
    );

    setCalls(newCalls);
  }, [signRequestData, tokenId]);

  // Manage Connection
  const { account } = useAccount();

  useEffect(() => {
    setIsConnected(!!account);
  }, [account]);

  // Set twitter code
  const [code, setCode] = useState<string>("");
  useEffect(() => {
    setCode(routerCode);
  }, [routerCode]);

  useEffect(() => {
    if (!code || !tokenId) return;

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        type: "twitter",
        token_id: tokenId,
        code: code,
      }),
    };

    fetch(`${process.env.NEXT_PUBLIC_VERIFIER_LINK}/sign`, requestOptions)
      .then((response) => response.json())
      .then((data) => setSignRequestData(data));
  }, [code, tokenId]);

  // Contract
  const {
    data: twitterVerificationData,
    sendAsync: execute,
    error: twitterVerificationError,
  } = useSendTransaction({ calls: calls ? [calls] : [] });

  function verifyTwitter() {
    if (calls) {
      execute();
    }
  }

  // Transaction Confirmation Handling
  useEffect(() => {
    if (!twitterVerificationData?.transaction_hash) return;

    addTransaction({
      timestamp: Date.now(),
      subtext: `Twitter verification on Starknet ID #${tokenId}`,
      type: NotificationType.TRANSACTION,
      data: {
        type: TransactionType.VERIFIER_TWITTER,
        hash: twitterVerificationData.transaction_hash,
        status: "pending",
      },
    });
    
    setIsTxModalOpen(true);
  }, [twitterVerificationData?.transaction_hash]);

  // Screen management
  const [screen, setScreen] = useState<string>("verifyTwitter");

  // Error Management
  useEffect(() => {
    if (signRequestData?.status === "error" || twitterVerificationError) {
      setScreen("error");
    }
  }, [twitterVerificationError, signRequestData]);

  const errorScreenVisible = isConnected && screen === "error";

  const closeModal = () => {
    setIsTxModalOpen(false);
    router.push(`/identities/${tokenId}`);
  };

  return (
    <>
      <div className={homeStyles.screen}>
        <div className={homeStyles.wrapperScreen}>
          <div className={homeStyles.container}>
            {screen === "verifyTwitter" && (
              !isConnected ? (
                <h1 className="sm:text-5xl text-5xl">You need to connect anon</h1>
              ) : (
                <VerifyFirstStep
                  onClick={verifyTwitter}
                  disabled={!calls}
                  buttonLabel="Verify my Twitter"
                  title="It's time to verify your Twitter on chain!"
                  subtitle="Safeguard your account with our network verification page"
                />
              )
            )}
            {errorScreenVisible && (
              <ErrorScreen
                onClick={() => router.push(`/identities/${tokenId}`)}
                buttonText="Retry to verify"
              />
            )}
          </div>
        </div>
      </div>
      <TxConfirmationModal
        txHash={twitterVerificationData?.transaction_hash}
        isTxModalOpen={isTxModalOpen}
        closeModal={closeModal}
        title="Your Twitter verification is ongoing!"
      />
    </>
  );
};

export default Twitter;
