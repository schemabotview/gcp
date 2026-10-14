import type { Section } from '../types'

export const principalsAndAuthentication: Section = {
  id: 'principals-and-authentication',
  title: 'Principals and authentication',
  scene: 'identity-principals',
  focus: 'authn',
  slide: `## Principals and authentication

A **principal** is any identity IAM can name in a policy. Every call answers two separate questions: **who are you?** and **may you do this?**

### Kinds of principal
- **Google Accounts** for people, managed through Cloud Identity or Workspace
- **Groups** — grant to the group, manage membership elsewhere
- **Service accounts** — identities for workloads, not people
- **Federated identities** — users or workloads signed in by an external identity provider

### Two questions, two systems
- **Authentication** proves identity with a credential
- **Authorisation** is IAM: does a policy allow this action here?
- Proving who you are grants **nothing** by itself`,
  narration:
    "Chapter one ended with a question: who is allowed to act? Before IAM can answer that, every request has to say who is asking. Google Cloud calls the asker a principal, meaning any identity that a policy can name. People usually have Google Accounts, managed by the company through Cloud Identity or Google Workspace, so alice at retail dot example is a principal. Groups are principals too, and they're the better place to grant access, because joining and leaving a team then changes access without anyone touching a policy. Workloads get service accounts, identities that belong to software rather than to a person. And if your people or your build systems already sign in somewhere else, an external identity provider can vouch for them through federation, so they never need a separate Google password or a stored key. There's also one special principal, all users, which means anyone on the internet, so granting a role to it makes something public. Now follow the band below them. A request arrives with a credential. Authentication checks that credential and answers one question only: who are you? Then authorisation, which is IAM, asks a separate question: does any policy allow this identity to perform this action on this resource? Keep those two apart. A perfectly valid sign-in grants no access at all. Many confusing errors make sense once you ask which of the two questions failed. Next, we look at how IAM policies actually grant access.",
}
