import React, { FunctionComponent, ReactNode, useContext } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/components/identitiesV1.module.css";
import { getDomainKind, minifyDomain } from "../../utils/stringService";
import ErrorIcon from "@mui/icons-material/Error";
import { Tooltip } from "@mui/material";
import {
  isIdentityExpiringSoon,
  timestampToReadableDate,
} from "../../utils/dateService";
import ArgentIcon from "../UI/iconsComponents/icons/argentIcon";
import { StarknetIdJsContext } from "../../context/StarknetIdJsProvider";
import { CDNImg } from "../cdn/image";

type IdentitiesGalleryV1Props = {
  identities: FullId[];
  externalDomains?: string[];
};

const IdentitiesGalleryV1: FunctionComponent<IdentitiesGalleryV1Props> = ({
  identities,
  externalDomains = [],
}) => {
  const router = useRouter();
  const { getPfp } = useContext(StarknetIdJsContext);

  return (
    // Our Indexer
    <div className={styles.galleryContainer}>
      {identities.map((identity, index) => {
        return (
          <div
            key={index}
            className={styles.imageGallery}
            onClick={() => router.push(`/identities/${identity.id}`)}
          >
            {isIdentityExpiringSoon(identity) ? (
              <div className={styles.expiryWarning}>
                <Tooltip
                  title={`Be careful, this domain will expire on ${timestampToReadableDate(
                    identity?.domain_expiry ?? 0
                  )}`}
                  arrow
                >
                  <ErrorIcon color="error" />
                </Tooltip>
              </div>
            ) : null}
            <CDNImg
              width={150}
              height={150}
              src={getPfp(identity.id)}
              alt="avatar"
              className="rounded-[20px]"
            />

            <p className="font-bold font-quickZap">
              {identity.domain
                ? minifyDomain(identity.domain)
                : `ID: ${identity.id}`}
            </p>
          </div>
        );
      })}
      {externalDomains.map((domain, index) => {
        const domainKind = getDomainKind(domain);

        function getIdentityImage(domainKind: DomainKind): ReactNode {
          switch (domainKind) {
            case "braavos":
              return (
                <CDNImg
                  width={150}
                  height={150}
                  src={"/braavos/braavosLogoWithBackground.webp"}
                  alt="avatar"
                  onClick={() => router.push(`/externaldomains/${domain}`)}
                  className="rounded-[16px]"
                />
              );
            case "xplorer":
              return (
                <div
                  onClick={() => router.push(`/externaldomains/${domain}`)}
                  className="bg-[#ffebd8] p-[16px] rounded-[16px]"
                >
                  <ArgentIcon width={"118px"} color="#f36a3d" />
                </div>
              );
            default:
              return (
                <CDNImg
                  width={150}
                  height={150}
                  src={`${process.env.NEXT_PUBLIC_STARKNET_ID}/api/identicons/0`}
                  alt="avatar"
                  onClick={() => router.push(`/externaldomains/${domain}`)}
                />
              );
          }
        }

        return (
          <div key={index} className={styles.imageGallery}>
            {getIdentityImage(domainKind)}
            <p className="font-bold font-quickZap">{minifyDomain(domain)}</p>
            <div className={styles.expiryWarning}>
              <Tooltip
                title="This is domain is an external domain and is not an identity, you won't see it on your wallet."
                arrow
              >
                <ErrorIcon color="warning" />
              </Tooltip>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IdentitiesGalleryV1;
