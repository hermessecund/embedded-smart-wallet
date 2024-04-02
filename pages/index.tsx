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
    </div>
  );
};

export default Home;
