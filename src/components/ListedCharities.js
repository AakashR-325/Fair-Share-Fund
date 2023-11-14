import { useEffect, useState } from "react";
import CharityCard from "./CharityCard";
import { render } from "@testing-library/react";
import { ethers } from "ethers";
import abi from "../abi/FairShareFundABI.json";

export default function ListedCharities() {
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contractAddress = "0x5FD43DAe5295c5A60b2D6a382aC3b40c1ed2aCf4";
        const contract = new ethers.Contract(contractAddress, abi, provider);

        // Fetch array from the smart contract
        const array = await contract.getOrgs();
        setOrgs(array);
      } catch (error) {
        console.error("Error fetching array from contract:", error);
        setOrgs([]);
      }
    }

    fetchData();
  }, []);

  const renderComponents = () => {
    return orgs.map((element, index) => (
      <CharityCard name={element.name} desc={element.description} />
    ));
  };

  return <div class="row">{renderComponents()}</div>;
}
