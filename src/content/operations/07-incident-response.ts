import type { Section } from '../types'

export const incidentResponse: Section = {
  id: 'incident-response',
  title: 'Incident diagnosis, containment and privileged access',
  scene: 'operations-incident',
  focus: 'c1',
  slide: `## Incident response

The 02:41 Owner grant was **not** an approved change. Alice's account has probably been compromised.

### In order
- **Contain** first: remove the grant, suspend the account
- **Revoke** sessions, tokens and any keys it created
- **Scope** from audit logs: everything that identity did, and when
- **Rotate** every secret it could read; **repair** what it changed
- **Learn** in a blameless review, with fixes tracked to done

### Before the next one
- **Just-in-time** access: privileged roles granted briefly, with approval
- A sealed **break-glass** account, alarmed on every use
- Patching VMs and images remains **yours**`,
  narration:
    "Back to the audit entry from section three. At two forty one, Alice's account granted Owner on production to a contractor. Nobody approved that change, and Alice was asleep. The working assumption is that her account was compromised. The order of the response matters. Contain first: remove the grant and suspend Alice's account, so the access stops before anything else. Then revoke: sign out her sessions, and revoke tokens and any service account keys the account created. Then scope, using the audit logs: list everything that identity did, starting well before two forty one. Admin Activity logs will show configuration changes; whether you can see data reads depends on which Data Access logs were enabled, as section three warned. Then rotate every secret the identity could read, and repair anything it changed, from code and backups. Finally, learn. Hold a blameless review that asks how the account was compromised and why one account could grant Owner at all, and track the fixes to done. That second question points at prevention. Standing Owner grants should be rare. Privileged Access Manager can grant a role like Owner just in time, for an hour, after someone approves the request. A sealed break-glass account covers emergencies, with an alarm on every use. And remember the shared responsibility from chapter one: patching the operating systems on VMs and the images you build stays with you. Next: backups designed to survive an attacker.",
}
