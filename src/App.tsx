import {useAccount, useConnect, useDisconnect, useSendTransaction} from 'wagmi'
import {parseEther} from "viem";

function App() {

  const account = useAccount()
  const { connectors, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { sendTransactionAsync } = useSendTransaction()

  const getGnosisNonce = async ()  => {
    const response = await fetch(`https://safe-transaction-sepolia.safe.global/api/v1/safes/${account.address}`)
    const data = await response.json()
    return data?.nonce as number
  }
  const handleSend = async () => {
    try {
      const nonce = await getGnosisNonce()
      console.log('NONCE', nonce)

      await sendTransactionAsync({
        nonce,
        to: '0x27E82Ba6AfEbf3Eee3A8E1613C2Af5987929a546',
        value: parseEther('0.01'),
      })

      await sendTransactionAsync({
        nonce: nonce + 1,
        to: '0x27E82Ba6AfEbf3Eee3A8E1613C2Af5987929a546',
        value: parseEther('0.02'),
      })
    } catch (err) {
      console.log({err})
    }
  }

  return (
      <>
        <div>
          <h2>Account</h2>

          <div>
            status: {account.status}
            <br/>
            addresses: {JSON.stringify(account.addresses)}
            <br/>
            chainId: {account.chainId}
          </div>

          {account.status === 'connected' && (
              <button type="button" onClick={() => disconnect()}>
                Disconnect
              </button>
          )}
        </div>
        <hr/>
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => {
            return (
                <button
                    key={connector.uid}
                    onClick={() => {
                      connector.connect()
                    }}
                    type="button"
                >
                  {connector.name}
                </button>
            )
          })}
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
        <hr/>
        <div>
          <button onClick={handleSend}>Send 2 txs</button>
        </div>
      </>
  )
}

export default App
