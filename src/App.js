import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import ListCharity from "./components/ListCharity";
import { ethers } from "ethers";
import CharityCard from "./components/CharityCard";
import FairShareFundABI from "./abi/FairShareFundABI.json";

const contractAddress = "0x164BC05D4e81e81eAB80272257d0B7bA4dCD77AA";

function App() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

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
        width: "100vw",
      }}
    >
      <Navbar account={account} setAccount={setAccount} />
      {/*<ListCharity />*/}
      <ListCharity contract={contract} provider={provider} />
    </div>
  );
}

export default App;
