import { FunctionComponent, MouseEvent } from "react";
import styles from "../../styles/components/desktopNav.module.css";
import Link from "next/link";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import theme from "../../styles/theme";

const DesktopNav: FunctionComponent = () => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <nav onClick={handleClick} className={styles.navContainer}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <Link href="/offers">
            <li className={styles.burgerItem}>My offers</li>
          </Link>
          <Link href={process.env.NEXT_PUBLIC_STARKNET_ID as string}>
            <li className={styles.burgerItem}>Website</li>
          </Link>
          <Link href="https://www.starknet.id/pdfs/Terms.pdf">
            <li className={styles.burgerItem}>Term of use</li>
          </Link>
        </div>
        <div className={styles.column}>
          <Link href="https://docs.starknet.id/">
            <li className={styles.burgerItem}>Documentation</li>
          </Link>
          <Link
            href={`${
              process.env.NEXT_PUBLIC_STARKNET_ID as string
            }/affiliates/individual-program`}
          >
            <li className={styles.burgerItem}>Affiliation</li>
          </Link>
          <Link href="https://starknet.id/pdfs/PrivacyPolicy.pdf">
            <li className={styles.burgerItem}>Privacy policy</li>
          </Link>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.socials}>
        <div className="rounded-full shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
          <Link href="https://twitter.com/Starknet_id">
            <FaTwitter size={24} color={theme.palette.secondary.main} />
          </Link>
        </div>
        <div className="rounded-full shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
          <Link href="https://discord.com/invite/8uS2Mgcsza">
            <FaDiscord size={24} color={theme.palette.secondary.main} />
          </Link>
        </div>
        <div className="rounded-full shadow-gray-400 p-3 cursor-pointer hover:scale-105 ease-in duration-300">
          <Link href="https://github.com/starknet-id">
            <FaGithub size={24} color={theme.palette.secondary.main} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;