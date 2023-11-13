import React, { useState } from "react";
import { ethers } from "ethers";
import logo from "../leaf-icon-fotor-bg-remover-202311127300.png";

export default function Navbar({ account, setAccount }) {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ border: "solid 1px black" }}
    >
      <div className="container-fluid">
        <img
          src={logo}
          height={50}
          paddingLeft="10px"
          backgroundColor="A1FEC1"
        ></img>
        <a
          className="navbar-brand"
          href="#"
          style={{ paddingLeft: "10px", fontWeight: "bold", fontSize: "25px" }}
        >
          Fair-Share-Fund
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                style={{ fontSize: "20px", paddingLeft: "30px" }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#"
                style={{ fontSize: "20px", paddingLeft: "30px" }}
              >
                Join
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#"
                style={{ fontSize: "20px", paddingLeft: "30px" }}
              >
                Contribute
              </a>
            </li>
            <form
              className="d-flex"
              role="search"
              style={{ marginLeft: "180%" }}
            >
              {account ? (
                <span
                  className="badge"
                  style={{
                    height: "40px",
                    paddingTop: "10px",
                    fontSize: "15px",
                    color: "black",
                    border: "2px solid black",
                  }}
                >
                  {account.slice(0, 8) + "..." + account.slice(34, 42)}
                </span>
              ) : (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={connectHandler}
                  style={{ marginRight: "120px" }}
                >
                  Connect
                </button>
              )}
            </form>
          </ul>
        </div>
      </div>
    </nav>
  );
}
