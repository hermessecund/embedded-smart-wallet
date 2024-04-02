import {
  ConnectWallet,
  Web3Button,
  useOwnedNFTs,
  useAddress,
  useContract,
  ThirdwebNftMedia,
  useClaimNFT,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { editionDropAddress } from "../const";

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(editionDropAddress);
  const { data, isLoading } = useOwnedNFTs(contract, address);
  const { mutateAsync: claim, isLoading: isClaiming } = useClaimNFT(contract);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>ib-car</h1>
        <nav className={styles.nav}>
          {/* Add your navigation links here */}
          <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
            <li><a href="#">Link 3</a></li>
            {/* Add more links as needed */}
          </ul>
        </nav>
        <ConnectWallet
          dropdownPosition={{
            side: "top",
            align: "center",
          }}
        />
        {address ? (
          <div className={styles.nft}>
            <Web3Button
              contractAddress={editionDropAddress}
              action={() =>
                claim({
                  tokenId: 0,
                  quantity: 1,
                })
              }
            >
              Claim Edition NFT
            </Web3Button>
          </div>
        ) : (
          <p>Please log in with your Google account or email</p>
        )}
      </header>
      <main className={styles.main}>
        {/* Add your main content here */}
        {address && isLoading ? <p>Loading Owned NFTs...</p> : null}
        {address && !isLoading && data && data.length === 0 ? (
          <p>
            {isClaiming
              ? "Deploying your account and claiming..."
              : "No NFTs, claim one now!"}
          </p>
        ) : null}
        {data &&
          data?.map((nft) => (
            <div className={styles.container} key={nft.metadata.id}>
              <ThirdwebNftMedia metadata={nft.metadata} />
              <p>
                You own {nft.quantityOwned} {nft.metadata.name}
              </p>
            </div>
          ))}
      </main>
      <footer className={styles.footer}>
        {/* Add your footer content here */}
        <p>Footer content goes here</p>
      </footer>
      {/* Absolute div with background covering the entire screen */}
      <div className={styles.absoluteWrapper}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13225.474096078236!2d-6.7491399!3d34.0344167!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda741c7c4865a09%3A0x28359510c8b5cf49!2sIBRAHIM%20CAR!5e0!3m2!1sen!2sma!4v1712030992616!5m2!1sen!2sma"
          width="600"
          height="450"
          style={{ border: "0" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
