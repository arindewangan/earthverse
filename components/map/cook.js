/**
 * Peter Todorov https://github.com/Ptodoroff
 * [finalHash description]
 * @return {[type]} [description]
 */

// import { EvmChain } from "@moralisweb3/evm-utils";
import { ethers } from "ethers";
import sendOven from "../../pages/sendOven/[babaganoush].js";

let hashStore = [];
let hashedArrAsString;
let plotID;
let ganache;

export const add = (what3words) => {
  let plotView = String(what3words);
  let hash = ethers.utils.id(plotView);
  hashStore.push(hash);
};

export const melt = () => {
  hashedArrAsString = hashStore.join("");
  plotID = ethers.utils.id(hashedArrAsString);
  ganache = Object.assign({}, hashStore);
  // ganache.masterHash = plotID;
  console.log(`ganache: ${ganache}`);

  // return ganache;
  sendOven(ganache);
};
