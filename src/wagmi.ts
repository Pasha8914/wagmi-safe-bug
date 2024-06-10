import { createConfig, http } from '@wagmi/core'
import { sepolia } from '@wagmi/core/chains'
import { safe } from '@wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    safe()
  ],
  transports: {
    [sepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
