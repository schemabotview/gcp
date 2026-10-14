import type { Section } from '../types'

export const accessAndSignedUrls: Section = {
  id: 'access-and-signed-urls',
  title: 'IAM, uniform access and signed URLs',
  scene: 'storage-access',
  focus: 's2',
  slide: `## Access, uniform buckets and signed URLs

Use **uniform bucket-level access**: IAM alone decides who can read or write, and per-object ACLs are switched off.

### Signed URLs
- A time-limited URL for **one** method on **one** object
- The browser uploads **directly**; the API never handles the bytes
- Signed with the API's identity, so it grants **no more** than that identity holds
- V4 URLs last at most **7 days**; prefer minutes
- The URL cannot judge content: **check type and size** after upload

### Guard-rails
- **Public access prevention** blocks grants to \`allUsers\`
- Grant at the **bucket**, to the narrowest role, not the whole project
- The signing identity needs **create** on the bucket, not admin`,
  narration:
    "Cloud Storage has two access systems, and new buckets should use only one of them. With uniform bucket-level access turned on, IAM alone decides who can read or write, and the older per-object access lists are switched off. That keeps every grant visible in one place. Now a real flow. A customer wants to attach a photo to a product review. You could stream the upload through the API, but that ties up the service and its memory for no benefit. Instead, the browser asks the API for permission to upload. The API generates a signed URL: valid for one method, PUT, on one object name, for ten minutes. The browser uploads straight to the bucket using that URL, and after ten minutes the URL is useless. Note how the trust works. The URL is signed as the API's own service account, so it can grant no more than that account holds. If the account can't create objects in that bucket, neither can anyone holding the URL. Version four URLs can last up to seven days, but short is safer. Prefer minutes. And the URL can't judge what's uploaded, so check the file's type and size afterwards. Two guard-rails complete the picture. Public access prevention blocks anyone from granting access to all users on the bucket, which stops the classic accidental public bucket. And grant roles on the bucket, choosing the narrowest role, rather than on the whole project. Next: what happens when two writers collide.",
}
