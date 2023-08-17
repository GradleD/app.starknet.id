import React from "react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import styles2 from "../styles/search.module.css";
import SearchBar from "../components/UI/searchBar";
import DomainCard from "../components/domains/domainCard";
import DomainMenu from "../components/domains/domainMenu";
import { useExpiryFromDomain } from "../hooks/naming";
import { isStarkRootDomain } from "../utils/stringService";
import { useAccount } from "@starknet-react/core";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [domain, setDomain] = useState<string>("");
  const { account } = useAccount();
  const [isAvailable, setIsAvailable] = useState<boolean | undefined>();
  const { expiry: data, error } = useExpiryFromDomain(domain);

  useEffect(() => {
    if (
      router?.query?.domain &&
      isStarkRootDomain(router.query.domain.concat(".stark") as string)
    ) {
      setDomain(router.query.domain as string);
    }
  }, [router]);

  useEffect(() => {
    const currentTimeStamp = new Date().getTime() / 1000;

    if (error || !data) {
      setIsAvailable(false);
    } else {
      setIsAvailable(Number(data?.["expiry"]) < currentTimeStamp);
    }
  }, [data, error, domain]);

  useEffect(() => {
    if (account) {
      setIsMenuVisible(true);
    } else {
      setIsMenuVisible(false);
    }
  }, [isAvailable, account]);

  return (
    <div className={styles.screen}>
      <div className={styles2.container}>
        <div className="sm:w-2/3 w-4/5 mt-5">
          <SearchBar
            onChangeTypedValue={(typeValue: string) => setDomain(typeValue)}
            showHistory={false}
          />
          {domain && (
            <DomainCard
              isAvailable={isAvailable}
              domain={domain.concat(".stark")}
              isConnected={Boolean(account)}
            />
          )}
        </div>

        {isMenuVisible ? (
          <DomainMenu isAvailable={isAvailable} domain={domain as string} />
        ) : null}
      </div>
    </div>
  );
};

export default SearchPage;
