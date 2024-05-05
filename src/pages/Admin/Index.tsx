import React, { useEffect, useState } from 'react'
import Navbar from "../../components/Navbar/Index"
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { addToken, getAllGames, initializeGame, withdrawSols, withdrawTokens } from '../../program/game-func';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { LAMPORTS_PER_SOL, PublicKey, sendAndConfirmRawTransaction } from '@solana/web3.js';
import { toast } from 'react-toastify';
import { connection } from '../../program/environment';
import { getAssociatedTokenAddress } from '@solana/spl-token';

const Index = () => {
    const wallet = useAnchorWallet();
    const [tokenAddress, setTokenAddress] = useState<string>("")
    const [tokenAmount, setTokenAmount] = useState<number>(0)
    const [withdrawSolAmnt, setWithdrawSolAmnt] = useState<number>(0)
    const [withdrawTokenAmnt, setWithdrawTokenAmnt] = useState<number>(0)
    const [refetch, setRefetch] = useState<boolean>(false)
    const [gameDetails, setGameDetails] = useState({
        address : "",
        amount: 0
    })
    const [gameTokenDetails, setGameTokenDetails] = useState({
        address : "",
        amount: 0
    })
    const [gameValues, setGameValues] = useState({
        amount: 0,
    })

    const onChangeValues = (e:any) => {
        setGameValues((prev)=>({
            ...prev,
            [e.target.name] : parseFloat(e.target.value)
        }))
    }

    const initialize = async () => {
        try {
            if (wallet) {

                const tx = await initializeGame(wallet, gameValues);
                if (!tx) {
                    return
                }
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

                console.log(tx)
                const signedTx = await wallet.signTransaction(tx)

                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize(),{
                    skipPreflight: true
                })

                console.log('signature', txId)
                setRefetch(!refetch);
                toast.success("Game Created")
            }
        } catch (e:any) {
            // const error = getErrorMessageFromFormattedString(e.message)
            console.log(e)
            toast.error(e.message)  
        }
    }

    const addPlayToken = async () => {
        try {
            if (wallet) {

                const tx = await addToken(wallet, tokenAmount, new PublicKey(tokenAddress));
                if (!tx) {
                    return
                }
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

                console.log(tx)
                const signedTx = await wallet.signTransaction(tx)

                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize(),{
                    skipPreflight: true
                })

                console.log('signature', txId)
                toast.success("Token Added")
                setRefetch(!refetch);
            }
        } catch (e:any) {
            // const error = getErrorMessageFromFormattedString(e.message)
            console.log(e)
            toast.error(e.message)  
        }
    }

    const withdrawSolsvault = async () => {
        try {
            if (wallet) {

                const tx = await withdrawSols(wallet, withdrawSolAmnt);
                if (!tx) {
                    return
                }
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

                console.log(tx)
                const signedTx = await wallet.signTransaction(tx)

                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize(),{
                    skipPreflight: true
                })

                console.log('signature', txId)
                setRefetch(!refetch);
                toast.success("Sols added to wallet")
            }
        } catch (e:any) {
            // const error = getErrorMessageFromFormattedString(e.message)
            console.log(e)
            toast.error(e.message)  
        }
    }

    const withdrawTokenvault = async () => {
        try {
            if (wallet) {

                const tx = await withdrawTokens(wallet, withdrawTokenAmnt);
                if (!tx) {
                    return
                }
                tx.feePayer = wallet.publicKey
                tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash

                console.log(tx)
                const signedTx = await wallet.signTransaction(tx)

                const txId = await sendAndConfirmRawTransaction(connection, signedTx.serialize(),{
                    skipPreflight: true
                })

                console.log('signature', txId)
                toast.success("Tokens added to wallet")
                setRefetch(!refetch);
            }
        } catch (e:any) {
            // const error = getErrorMessageFromFormattedString(e.message)
            console.log(e)
            toast.error(e.message)  
        }
    }

    useEffect(()=>{
        (async()=>{
          if(!wallet) return
          const game = await getAllGames(wallet);
          if (game.length > 0){
              const gameB = await connection.getBalance(game[0]?.publicKey);
              const gameAta = await getAssociatedTokenAddress(game[0]?.account?.tokenAddress, game[0]?.publicKey, true);
              if(await connection.getAccountInfo(gameAta)){
                 const gameTokenB = await connection.getTokenAccountBalance(gameAta);
                 setGameTokenDetails({
                     address : gameAta?.toString(),
                     amount: gameTokenB?.value?.uiAmount ?? 0
                 })
                }
              
              setGameDetails({
                  address : game[0]?.publicKey?.toString(),
                  amount: gameB / LAMPORTS_PER_SOL ?? 0
                })
                
            }
        })();
      },[wallet, refetch])
    
    return (
        <div>
            <Navbar />
            <Container className='my-3'>
                <p className='text-white mb-3'>Important : Place this pool address right after creating game in "game-func" file inside "program" folder</p>
                <p className='text-white mb-0'>Pool Address : {gameDetails ? gameDetails.address : ""}</p>
                <p className='text-white'>Pool Amount : {gameDetails ? gameDetails.amount : 0}</p>


                <p className='text-white mb-0'>Pool Token Account Address : {gameTokenDetails ? gameTokenDetails.address : ""}</p>
                <p className='text-white'>Pool Token Amount : {gameTokenDetails ? gameTokenDetails.amount : 0}</p>


                <Form data-bs-theme='dark'>
                <Form.Label className='text-white'>Play Token</Form.Label>
                    <Form.Control className='mb-3' type="number" name='amount' placeholder="Sol" onChange={onChangeValues} disabled />

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label className='text-white'>Transfer Amount</Form.Label>
                        <Form.Control type="number" name='amount' placeholder="Amount" onChange={onChangeValues} />
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="">
                        <Form.Label className='text-white'>Play Amount</Form.Label>
                        <Form.Control type="number" name='playAmount' placeholder="Amount" onChange={onChangeValues} />
                    </Form.Group> */}

                    {/* <Form.Group className="mb-3" controlId="">
                        <Form.Label className='text-white'>First Reward</Form.Label>
                        <Form.Control type="number" name='first' placeholder="Amount" onChange={onChangeValues} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label className='text-white'>Second Reward</Form.Label>
                        <Form.Control type="number" name='second' placeholder="Amount" onChange={onChangeValues} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label className='text-white'>Third Reward</Form.Label>
                        <Form.Control type="number" name='third' placeholder="Amount" onChange={onChangeValues} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label className='text-white'>Fourth Reward</Form.Label>
                        <Form.Control type="number" name='fourth' placeholder="Amount" onChange={onChangeValues} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label className='text-white'>Fifth Reward</Form.Label>
                        <Form.Control type="number" name='fifth' placeholder="Amount" onChange={onChangeValues} />
                    </Form.Group> */}

                    <Button variant="primary" onClick={initialize}>
                        Create Game
                    </Button>
                </Form>

                <Form data-bs-theme='dark'>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label className='text-white'>Token Address</Form.Label>
                        <Form.Control type="text" name='token-address' placeholder="Token Address" onChange={(e)=>{setTokenAddress(e.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="">
                        <Form.Label className='text-white'>Token Transfer Amount</Form.Label>
                        <Form.Control type="number" name='amount' placeholder="Amount" onChange={(e)=>{setTokenAmount(parseFloat(e.target.value))}} />
                    </Form.Group>

                    <Button variant="primary" onClick={addPlayToken}>
                        Add Token
                    </Button>
                </Form>

                <Form data-bs-theme='dark'>
                    <Form.Group className="my-3" controlId="">
                        <Form.Label className='text-white'>Sols Withdraw Amount</Form.Label>
                        <Form.Control type="number" name='amount' placeholder="Amount" onChange={(e)=>{setWithdrawSolAmnt(parseFloat(e.target.value))}} />
                    </Form.Group>

                    <Button variant="primary" onClick={withdrawSolsvault}>
                        Withdraw Sols
                    </Button>
                </Form>


                <Form data-bs-theme='dark'>
                    <Form.Group className="my-3" controlId="">
                        <Form.Label className='text-white'>Token Withdraw Amount</Form.Label>
                        <Form.Control type="number" name='amount' placeholder="Amount" onChange={(e)=>{setWithdrawTokenAmnt(parseFloat(e.target.value))}} />
                    </Form.Group>

                    <Button variant="primary" onClick={withdrawTokenvault}>
                        Withdraw Tokens
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Index