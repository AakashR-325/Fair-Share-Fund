import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ListCharity from "./components/ListCharity";
import { ethers } from "ethers";
import CharityCard from "./components/CharityCard";
import FairShareFundABI from "./abi/FairShareFundABI.json";
import ListedCharities from "./components/ListedCharities";

const contractAddress = "0x5FD43DAe5295c5A60b2D6a382aC3b40c1ed2aCf4";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [orgs, setOrgs] = useState([]);

  const blockchainData = async () => {
    //Connect To Blockchain
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    //connect to smart contract
    const protocol = new ethers.Contract(
      contractAddress,
      FairShareFundABI,
      provider
    );
    setContract(protocol);
  };

  useEffect(() => {
    blockchainData();
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundColor: "#A1FEC1",
        height: "100vh",
        maxWidth: "100%",
      }}
    >
      <Navbar account={account} setAccount={setAccount} />
      {/*<ListCharity contract={contract} provider={provider} />*/}
      <ListedCharities contract={contract} provider={provider} />
    </div>
  );
}

export default App;
