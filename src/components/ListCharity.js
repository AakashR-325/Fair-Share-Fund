import { ethers } from "ethers";
import { useState } from "react";

export default function ListCharity({ contract, provider }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [addr, setAddr] = useState("");

  const handleOnChangeName = (event) => {
    setName(event.target.value);
  };

  const handleOnChangeDesc = (event) => {
    setDesc(event.target.value);
  };

  const handleOnChangeAddr = (event) => {
    setAddr(event.target.value);
  };

  const handleSubmit = async () => {
    const name = document.getElementById("name").value;
    const desc = document.getElementById("description").value;
    const addr = document.getElementById("address").value;

    const signer = await provider.getSigner();

    try {
      let transaction = await contract.connect(signer).addOrg(addr, name, desc);
      await transaction.wait();
    } catch (e) {
      console.log(e);
    }

    setName("");
    setDesc("");
    setAddr("");
  };

  return (
    <div
      className="card mb-3 mx-auto"
      style={{
        height: "500px",
        maxWidth: "940px",
        background: "hsla(0, 0%, 100%, 0.4)",
        color: "black",
        marginTop: "40px",
        border: "1px solid #a2a4a6",
        borderRadius: "10px",
      }}
    >
      <form style={{ margin: "30px" }}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Name Of Organisation :
          </label>
          <input
            class="form-control"
            id="name"
            value={name}
            onChange={handleOnChangeName}
            aria-describedby="emailHelp"
            style={{ maxWidth: "300px" }}
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Description / Cause :
          </label>
          <textarea
            class="form-control"
            id="description"
            value={desc}
            onChange={handleOnChangeDesc}
            rows="5"
          ></textarea>
        </div>
        <div class="mb-1">
          <label for="exampleInputEmail1" class="form-label">
            Wallet address for accepting donation :
          </label>
          <input
            class="form-control"
            id="address"
            value={addr}
            onChange={handleOnChangeAddr}
            aria-describedby="emailHelp"
            style={{ maxWidth: "300px" }}
          />
        </div>
        <div id="as" class="form-text" style={{ marginBottom: "20px" }}>
          Don't have a wallet address? Go{" "}
          <a
            href="https://metamask.io/download/"
            class="link-underline-dark"
            target="_blank"
          >
            here
          </a>
          .
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
