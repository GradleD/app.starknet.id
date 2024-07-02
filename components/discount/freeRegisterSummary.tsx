import React, { FunctionComponent } from "react";
import styles from "../../styles/components/registerV3.module.css";
import { getYearlyPrice } from "@/utils/priceService";
import DoneIcon from "../UI/iconsComponents/icons/doneIcon";
import { GasTokenPrice } from "@avnu/gasless-sdk";
import { tokenNames } from "@/utils/altcoinService";
import { shortenDomain } from "@/utils/stringService";
import StyledToolTip from "../UI/styledTooltip";
import { GasMethod } from "@/hooks/paymaster";

type FreeRegisterSummaryProps = {
  duration: number;
  domain: string;
  hasPaymasterRewards?: boolean;
  gasTokenPrices?: GasTokenPrice[];
  gasTokenPrice?: GasTokenPrice;
  setGasTokenPrice: (price: GasTokenPrice) => void;
  gasMethod: GasMethod;
  setGasMethod: (method: GasMethod) => void;
  paymasterAvailable: boolean;
};

const FreeRegisterSummary: FunctionComponent<FreeRegisterSummaryProps> = ({
  domain,
  duration,
  hasPaymasterRewards,
  gasTokenPrices,
  gasTokenPrice,
  setGasTokenPrice,
  gasMethod,
  setGasMethod,
  paymasterAvailable,
}) => {
  function getMessage() {
    return `${Math.floor(duration / 30)} months of domain registration`;
  }

  return (
    <div className={styles.pricesSummary}>
      <div className={styles.totalDue}>
        <h4 className={styles.totalDueTitle}>Total due:</h4>
        <div className={styles.priceContainer}>
          <p className={styles.legend}>{getMessage()}</p>
          <p>
            <span className="line-through">{getYearlyPrice(domain)} ETH</span>
            &nbsp;&nbsp;
            <strong>Free</strong>
          </p>
        </div>
        <div className={styles.gasMethods}>
          <button
            disabled={gasMethod === "traditional"}
            onClick={() => setGasMethod("traditional")}
            className={
              gasMethod === "traditional"
                ? styles.gasMethodSelected
                : styles.gasMethod
            }
            type="button"
          >
            Traditional Transaction
          </button>
          <StyledToolTip
            title={`Allows you to pay less gas and choose other currencies to pay fees. ${
              paymasterAvailable
                ? ""
                : "Wallet not compatible. Please deploy it or switch to ArgentX in order to use Paymaster."
            }`}
          >
            <button
              onClick={() => setGasMethod("paymaster")}
              className={
                gasMethod === "paymaster"
                  ? styles.gasMethodSelected
                  : styles.gasMethod
              }
              type="button"
              disabled={!paymasterAvailable}
            >
              Gasless Transaction
            </button>
          </StyledToolTip>
        </div>
        {gasMethod === "paymaster" ? (
          hasPaymasterRewards ? (
            <div className="flex items-center gap-2">
              <DoneIcon width="24" color="green" />
              <p className="text-sm">
                No gas fees to pay. You have a{" "}
                <a
                  href="https://doc.avnu.fi/starknet-paymaster/introduction"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline"
                >
                  Paymaster
                </a>{" "}
                reward.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm">
                No{" "}
                <a
                  href="https://doc.avnu.fi/starknet-paymaster/introduction"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline"
                >
                  Paymaster
                </a>{" "}
                reward. Please select a gas token.
              </p>
              <div className={styles.gasMethods}>
                {gasTokenPrices?.map((price) => (
                  <button
                    disabled={
                      price.tokenAddress === gasTokenPrice?.tokenAddress
                    }
                    onClick={() => setGasTokenPrice(price)}
                    key={price.tokenAddress}
                    className={
                      price.tokenAddress === gasTokenPrice?.tokenAddress
                        ? styles.gasMethodSelected
                        : styles.gasMethod
                    }
                    type="button"
                  >
                    {tokenNames[
                      price.tokenAddress as keyof typeof tokenNames
                    ] || shortenDomain(price.tokenAddress)}{" "}
                  </button>
                ))}
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default FreeRegisterSummary;
