import type { Section } from '../types'

export const firewallRules: Section = {
  id: 'firewall-rules',
  title: 'Firewall policies, rules and priority',
  scene: 'networking-firewall',
  focus: 'network',
  slide: `## Firewall policies, rules and priority

Every connection is checked against firewall rules. A rule names a **direction**, a **target**, a **source**, ports, an action and a **priority**.

### How rules are evaluated
- **Hierarchical** policies from the organisation and folders come first
- Then the network's rules: **lowest number wins**; deny wins a tie
- Last, the **implied** rules at 65535: deny all ingress, allow all egress

### Writing good rules
- Target **service accounts** rather than IP addresses or tags
- Rules are **stateful**: replies to allowed traffic come back automatically
- Turn on **firewall rule logging** to see which rule matched
- A permitted connection says nothing about **authorisation** at the application`,
  narration:
    "Routes say where a packet can go. Firewall rules say whether it's allowed. Each rule has a direction, ingress or egress. It has a target, meaning which VMs it applies to, and a source or destination range. Then come the protocols and ports, an action of allow or deny, and a priority. The rule on the left lets Google's load-balancer health checkers, which come from two documented ranges, reach port eighty eighty on the order VMs. It targets them by service account, which is stable and needs IAM to change, unlike an IP address or a network tag that anyone with edit rights can attach. Evaluation runs in order. Hierarchical firewall policies, set on the organisation or folders, are checked first, so a security team can enforce rules that no project can override. Then the network's own rules, lowest priority number first, with deny winning a tie. Finally, if nothing matched, the implied rules at priority sixty five five three five: all ingress denied, all egress allowed. When you can't tell which rule decided, turn on firewall rule logging and read the match. Two facts explain most surprises. First, rules are stateful. If a connection is allowed out, its replies come back without a matching ingress rule. Second, a firewall controls reachability, not identity. A permitted connection still has to pass the application's own authentication and IAM. Next: how names turn into addresses.",
}
