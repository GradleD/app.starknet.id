import React, { useContext } from "react";
import { FunctionComponent, useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import { FormType } from "../../utils/constants";
import { FormContext } from "@/context/FormProvider";
import RegisterSteps from "./steps/registerSteps";
import UserInfoForm from "./steps/userInfoForm";
import CheckoutCard from "./steps/checkoutCard";
import SelectPfp from "./steps/selectPfp";
import { StarknetIdJsContext } from "@/context/StarknetIdJsProvider";
import evergreenDiscounts from "@/utils/discounts/evergreen";

type RenewalProps = {
  groups: string[];
};

const RenewalV2: FunctionComponent<RenewalProps> = ({ groups }) => {
  const { address } = useAccount();
  const [currentStep, setCurrentStep] = useState(1);
  const { updateFormState, userNfts, isLoadingNfts } = useContext(FormContext);
  const { starknetIdNavigator } = useContext(StarknetIdJsContext);
  const [showPfp, setShowPfp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) setCurrentStep(1);
  }, [address]);

  useEffect(() => {
    // Initialize the upsell state
    updateFormState({
      isUpselled: true,
      duration: 1,
    });
  }, [address]);

  // check if user has a profile picture set on his main domain
  // if not, show the select pfp step and store his main id
  useEffect(() => {
    if (isLoadingNfts) return;
    if (!userNfts || userNfts.length === 0) {
      setShowPfp(false);
      setIsLoading(false);
      return;
    }
    starknetIdNavigator
      ?.getProfileData(address as string, false)
      .then((res) => {
        if (!res?.profilePicture) {
          setShowPfp(true);
          setIsLoading(false);
          starknetIdNavigator?.getStarknetId(res?.name as string).then((id) => {
            updateFormState({
              tokenId: parseInt(id),
            });
          });
        } else {
          setShowPfp(false);
          setIsLoading(false);
        }
      });
  }, [userNfts, address, isLoadingNfts]);

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const goToNextStep = () => {
    if (currentStep === 1) {
      if (showPfp) goToStep(2);
      else goToStep(3);
    } else if (currentStep === 2) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <>
      <RegisterSteps
        currentStep={currentStep}
        setStep={goToStep}
        showPfp={showPfp}
        isLoading={isLoading}
      />
      {currentStep === 1 && (
        <UserInfoForm
          type={FormType.RENEW}
          goToNextStep={goToNextStep}
          imageUrl="/visuals/register.webp"
        />
      )}
      {currentStep === 2 && <SelectPfp goToNextStep={goToNextStep} />}
      {currentStep === 3 && (
        <CheckoutCard
          type={FormType.RENEW}
          groups={groups}
          discount={evergreenDiscounts.renewal}
        />
      )}
    </>
  );
};

export default RenewalV2;
