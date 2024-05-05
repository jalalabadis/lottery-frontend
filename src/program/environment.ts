import { Connection, 
    clusterApiUrl 
} from "@solana/web3.js";
// export const connection = new Connection("https://explorer-api.devnet.solana.com", 'processed');
export const connection = new Connection(clusterApiUrl("devnet"), 'processed');
