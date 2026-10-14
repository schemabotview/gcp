import type { Section } from '../types'

export const addressesAndCidr: Section = {
  id: 'addresses-and-cidr',
  title: 'IP addresses, CIDR ranges and ports',
  scene: 'networking-cidr',
  focus: 'calc',
  slide: `## IP addresses, CIDR ranges and ports

An **IP address** names a machine's network interface; a **port** names a program on it; **TCP** or **UDP** says how they talk. A **CIDR** prefix names a whole block of addresses at once.

### Reading a CIDR range
- \`/20\` fixes the first 20 bits; the other 12 vary: **4,096 addresses**
- Google Cloud reserves **4** in every subnet's primary range
- Smaller prefix number, **bigger** block
- \`/24\` is 256 addresses; \`/16\` is 65,536

### Private ranges
- \`10/8\`, \`172.16/12\` and \`192.168/16\` are not routed on the internet
- Every network you will ever connect must use **non-overlapping** blocks
- Choosing them is a design decision, made once and hard to undo`,
  narration:
    "Before following a request across Google's network, we need four words. An IP address identifies a machine's network interface. A port identifies a program on that machine, so the storefront listens on one port and a database on another. A protocol, usually TCP or UDP, says how the two sides exchange data. And a CIDR prefix names a whole block of addresses in one short string. Let's work one out. Ten dot twenty dot zero dot zero slash twenty means the first twenty bits are fixed, and the remaining twelve bits can vary. Two to the power of twelve is four thousand and ninety six addresses, running from ten dot twenty dot zero dot zero to ten dot twenty dot fifteen dot two five five. Google Cloud reserves four addresses in every subnet's primary range: the network address, the default gateway, the second-to-last address and the broadcast address. So four thousand and ninety two are usable. Notice that a smaller number after the slash means a bigger block. Slash sixteen is sixteen times larger than slash twenty. The bottom of the scene shows the three private ranges. They're never routed on the public internet, so every company reuses them. That's exactly why choosing blocks needs care: any two networks you'll ever want to connect must not overlap, and changing addresses later is painful. Next, we use these blocks to build a network.",
}
