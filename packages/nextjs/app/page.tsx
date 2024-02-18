"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useState } from "react";
import {
  useDeployedContractInfo,
  useScaffoldContractRead,
  useScaffoldContractWrite,
} from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { writeAsync: mintTama } = useScaffoldContractWrite({
    contractName: "Tama",
    functionName: "purchase",
    args: [BigInt(1)],
    value: BigInt(10000000000000000),
  });

  const { data: balanceOf } = useScaffoldContractRead({
    contractName: "Tama",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: tokenID } = useScaffoldContractRead({
    contractName: "Tama",
    functionName: "tokenOfOwnerByIndex",
    args: [connectedAddress, BigInt(0)],
  });

  const { data: gameData } = useScaffoldContractRead({
    contractName: "Tama",
    functionName: "gameData",
    args: [tokenID],
  });

  const { data: tokenURI } = useScaffoldContractRead({
    contractName: "Tama",
    functionName: "tokenURI",
    args: [tokenID],
  });

  const { data: tamaContractData } = useDeployedContractInfo("Tama");

  function goTamaplay(){
    window.location.href = 'tamaplay';
  }

  function goTamafoodmint(){
    window.location.href = 'tamafoodmint';
  }

  const birthDate = new Date(Number(gameData ? gameData[1] : 0) * 1000)
  const lastEat = new Date(Number(gameData ? gameData[2] : 0) * 1000);
  const lastPlay = new Date(Number(gameData ? gameData[3] : 0) * 1000);
  const counter = gameData ? gameData[4] : 0;

  const firstEncoded = atob((tokenURI || "").replace("data:application/json;base64,", ""));

  var uri;
  try {
      uri = JSON.parse(firstEncoded).image;
      console.log("successing parsing");
      uri = uri.replace("data:image/svg+xml;base64,","")
      uri = atob(uri).replace("<svg></svg>","</svg>")
      uri = btoa(uri);
      uri = "data:image/svg+xml;base64," + uri;
  } catch (e) {
      console.log("failing parsing");
  }

  

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">

        { balanceOf != BigInt(0) &&
        <>

          <img height="100px" width="100px" src={uri} alt="The token URI" />

          <div className="text-sm font-semibold">
            Number of TAMA owned: {balanceOf?.toString()}
          </div>
          <div className="p-5">
            POINTS <strong>{counter.toString()}</strong>
            <br />
            BIRTH DATE <strong>{birthDate.toDateString()}</strong>
            <br />
            LAST EAT <strong>{Number(gameData ? gameData[3] : 0) == 0 ? "NEVER EATEN ;(" : lastEat.toDateString()}</strong>
            <br />
            LAST PLAY <strong>{lastPlay.toDateString()}</strong>
          </div>
        </>
        }

        { balanceOf == BigInt(0) &&
        <>
          <div className="p-5">
            <p>GET YOUT TAMA</p>
            <button className="btn btn-primary" onClick={mintTama} disabled={Number(balanceOf)==2}>
              MINT NOW
            </button>
            <p>ONLY <strong>0.01</strong> ETH</p>
          </div>
        </>
        }
        

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              🦦🧸🐔🦄🐩
              <p>
                <strong>PLAY WITH YOUR TAMA</strong>
                <br /><br />
                <button className="btn btn-primary" onClick={goTamaplay}>
                  PLAY NOW
                </button>
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              🍇🍍🍌🍗🥩🥕
              <p>
                <strong>MINT TAMAFOOD</strong>
                <br /><br />
                <button className="btn btn-primary" onClick={goTamafoodmint}>
                  MINT NOW
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
