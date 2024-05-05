import { LAMPORTS_PER_SOL, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import * as anchor from '@project-serum/anchor'
import { AnchorProvider } from "@project-serum/anchor";
import idl from './idl.json'
import { connection } from "./environment"
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getMint } from "@solana/spl-token";

export const SOLANA_ADDRESS = new PublicKey("So11111111111111111111111111111111111111111");


// place the pool address generated in admin panel here
export const GAME= new PublicKey("GLJesAbfdqDYmZ1n3JTsajsZQhtuDVQsw4WXkBvbWonb")


export const getProvider = (wallet: AnchorWallet) => {
  const provider = new AnchorProvider(
    connection, wallet, { "preflightCommitment": "processed" },
  );
  return provider;
}

export const getAllGames = async (wallet: AnchorWallet) => {
  const provider = getProvider(wallet)
  const program = new anchor.Program(idl as anchor.Idl, idl.metadata.address, provider);

  const raffles = await program.account.game.all()

  return raffles
}


export const getGame = async (wallet: AnchorWallet, gameAddress : PublicKey) => {
  const provider = getProvider(wallet)
  const program = new anchor.Program(idl as anchor.Idl, idl.metadata.address, provider);

  const raffles = await program.account.game.fetch(gameAddress)

  return raffles
}


export const getStakeData = async (wallet: AnchorWallet) => {
  const provider = getProvider(wallet)
  const program = new anchor.Program(idl as anchor.Idl, idl.metadata.address, provider);

  const pools = await program.account.stakeEntry.all()

  return pools
}

export const program = async (wallet: AnchorWallet) => {
  const provider = getProvider(wallet)
  const program = new anchor.Program(idl as anchor.Idl, idl.metadata.address, provider);

  return program
}

export const initializeGame = async (wallet: AnchorWallet, values: any) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl as anchor.Idl, idl.metadata.address, provider);
    const game = PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode("game"),
      wallet.publicKey.toBuffer()
      ],
      program.programId
    )[0];

    console.log("game", game.toString())


    const gameTx: TransactionInstruction = await program.methods.initGame(
      {
        amount: new anchor.BN(values.amount * LAMPORTS_PER_SOL)
      }
    ).accounts({
      game: game,
      payer: wallet.publicKey,
      systemProgram: SystemProgram.programId
    }).instruction()

    const transaction = new Transaction().add(gameTx)

    return transaction;
  } catch (e) {
    console.log(e)
  }
}

export const playSolsGame = async (wallet: AnchorWallet, gameType: string) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl as anchor.Idl, idl.metadata.address, provider);
    const gameIdentifier: string = `game-${Math.random()}`;
    const player = PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode("player"),
      anchor.utils.bytes.utf8.encode(gameIdentifier)
      ],
      program.programId
    )[0];
    const game = GAME;
    const gameTx: TransactionInstruction = await program.methods.playSol({
      boxType:gameType,
      identifier: gameIdentifier
    }
    ).accounts({
      player: player,
      game: game,
      payer: wallet.publicKey,
      systemProgram: SystemProgram.programId
    }).instruction()

    const transaction = new Transaction().add(gameTx)

    return transaction;
  } catch (e) {
    console.log(e)
  }
}

export const playTokenGame = async (wallet: AnchorWallet, gameType:string) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl as anchor.Idl, idl.metadata.address, provider);
    const game = GAME;
    const gameIdentifier: string = `game-${Math.random()}`;
    const player = PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode("player"),
      anchor.utils.bytes.utf8.encode(gameIdentifier)
      ],
      program.programId
    )[0];

    const gameData = await getGame(wallet, GAME);
    const tokenAddress = gameData?.tokenAddress;

    const gameAta = await getAssociatedTokenAddress(new PublicKey(tokenAddress), game, true)
    const payerAta = await getAssociatedTokenAddress(new PublicKey(tokenAddress), wallet.publicKey)

    const gameTx: TransactionInstruction = await program.methods.playToken({
      boxType:gameType,
      identifier: gameIdentifier
    }
    ).accounts({
      player: player,
      game: game,
      gameTokenAccount: gameAta,
      mint: tokenAddress,
      payerTokenAccount: payerAta,
      payer: wallet.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).instruction()

    const transaction = new Transaction().add(gameTx)

    return transaction;
  } catch (e) {
    console.log(e)
  }
}

export const claim = async (wallet: AnchorWallet) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl as anchor.Idl, idl.metadata.address, provider);
    const game = GAME;
    const playerGame = await program.account.player.all([
      {memcmp : {offset : 9, bytes: wallet?.publicKey?.toString()}},
      {memcmp : {offset : 41, bytes: '1'}}
    ]);
    console.log("playerGame",playerGame)

    const player = playerGame[0]?.publicKey;


    const gameData = await getGame(wallet, GAME);
    const tokenAddress = gameData?.tokenAddress;

    const gameAta = await getAssociatedTokenAddress(new PublicKey(tokenAddress), game, true)
    const payerAta = await getAssociatedTokenAddress(new PublicKey(tokenAddress), wallet.publicKey)

    const gameTx: TransactionInstruction = await program.methods.claimReward()
    .accounts({
      player: player,
      game: game,
      gameTokenAccount: gameAta,
      mint: tokenAddress,
      payerTokenAccount: payerAta,
      payer: wallet.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).instruction()

    const transaction = new Transaction().add(gameTx)

    return transaction;
  } catch (e) {
    console.log(e)
  }
}

export const withdrawSols = async (wallet: AnchorWallet, amount: number) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl as anchor.Idl, idl.metadata.address, provider);
    const game = GAME;


    const gameTx: TransactionInstruction = await program.methods.withdrawSol(
      {
        amount: new anchor.BN(amount * LAMPORTS_PER_SOL)
      }
    ).accounts({
      game: game,
      payer: wallet.publicKey,
      systemProgram: SystemProgram.programId
    }).instruction()

    const transaction = new Transaction().add(gameTx)

    return transaction;
  } catch (e) {
    console.log(e)
  }
}

export const withdrawTokens = async (wallet: AnchorWallet, amount: number) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl as anchor.Idl, idl.metadata.address, provider);
    const game = GAME;

    const gameData = await getGame(wallet, GAME);
    const tokenAddress = gameData?.tokenAddress;

    const gameAta = await getAssociatedTokenAddress(new PublicKey(tokenAddress), game, true)
    const payerAta = await getAssociatedTokenAddress(new PublicKey(tokenAddress), wallet.publicKey)

    const gameTx: TransactionInstruction = await program.methods.withdrawToken(
      {
        amount: new anchor.BN(amount * 100)
      }
    )
    .accounts({
      game: game,
      gameTokenAccount: gameAta,
      mint: tokenAddress,
      payerTokenAccount: payerAta,
      payer: wallet.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    }).instruction()

    const transaction = new Transaction().add(gameTx)

    return transaction;
  } catch (e) {
    console.log(e)
  }
}

export const addToken = async (wallet: AnchorWallet, amount: number, tokenAddress: PublicKey) => {
  try {
    const provider = getProvider(wallet)
    const program = new anchor.Program(idl as anchor.Idl, idl.metadata.address, provider);
    const game = GAME;
    
    const tokenDetails = await getMint(connection, new PublicKey(tokenAddress))
    const gameAta = await getAssociatedTokenAddress(new PublicKey(tokenAddress), game, true)
    const defaultMultiplier = tokenDetails.decimals;
    const payerAta = await getAssociatedTokenAddress(new PublicKey(tokenAddress), wallet.publicKey)

    console.log("game", game.toString())

    const gameTx: TransactionInstruction = await program.methods.addToken(
      {
        defaultMultiplier: new anchor.BN(defaultMultiplier),
        amount: new anchor.BN(amount)
      }
    ).accounts({
      game: game,
      gameTokenAccount: gameAta,
      mint: tokenAddress,
      payerTokenAccount: payerAta,
      payer: wallet.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      rent: SYSVAR_RENT_PUBKEY
    }).instruction()

    const transaction = new Transaction().add(gameTx)

    return transaction;
  } catch (e) {
    console.log(e)
  }
}

export const getErrorMessageFromFormattedString = (errorString:string) => {
  const match = errorString.match(/custom program error: 0x([0-9a-fA-F]+)/);

  if (match && match[1]) {
      const hexErrorCode = match[1];
      const errorCode = parseInt(hexErrorCode, 16);
      const errorMessage = getErrorMessage(errorCode);

      return errorMessage || "Error message not found for the provided error code";
  } else {
      return errorString;
  }
}

function getErrorMessage(errorCode:number) {
  const errorCodes = idl.errors;
  const error = errorCodes.find(err => err.code === errorCode);
  return error ? error.msg : "Unknown error code";
}
