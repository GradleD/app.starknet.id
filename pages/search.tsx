import React from "react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import homeStyles from "../styles/Home.module.css";
import styles from "../styles/search.module.css";
import SearchBar from "../components/UI/searchBar";
import { isStarkRootDomain } from "../utils/stringService";
import IdentityCard from "../components/identities/identityCard";
import IdentityCardSkeleton from "../components/identities/skeletons/identityCardSkeleton";
import { useAccount } from "@starknet-react/core";
import { hexToDecimal } from "../utils/feltService";

const SearchPage: NextPage = () => {
  const router = useRouter();
  const [domain, setDomain] = useState<string>("");
  const [identity, setIdentity] = useState<Identity>();
  const { address } = useAccount();
  const [isOwner, setIsOwner] = useState(true);

  useEffect(() => {
    if (!identity || !address) return;
    setIsOwner(identity.owner_addr === hexToDecimal(address));
  }, [identity, address]);

  useEffect(() => {
    if (
      router?.query?.domain &&
      isStarkRootDomain(router.query.domain as string)
    ) {
      setDomain(router.query.domain as string);
    }
  }, [router]);

  useEffect(() => {
    if (isStarkRootDomain(domain)) {
      const refreshData = () =>
        fetch(
          `${process.env.NEXT_PUBLIC_SERVER_LINK}/domain_to_data?domain=${domain}`
        )
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(await response.text());
            }
            return response.json();
          })
          .then((data: Identity) => {
            setIdentity(data);
          });
      refreshData();
      const timer = setInterval(() => refreshData(), 30e3);
      return () => clearInterval(timer);
    }
  }, [domain]);

  return (
    <div className={homeStyles.screen}>
      <div className={styles.container}>
        <div className="sm:w-2/5 w-4/5 mb-5 mt-2">
          <SearchBar
            onChangeTypedValue={(typeValue: string) => setDomain(typeValue)}
            showHistory={false}
          />
        </div>
        {identity ? (
          <IdentityCard
            tokenId={identity.starknet_id ?? ""}
            identity={identity}
            isIdentityADomain={true}
            isOwner={isOwner}
          />
        ) : (
          <IdentityCardSkeleton />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
