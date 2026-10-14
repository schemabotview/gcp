import type { Scene } from '@graphlearning/flow'

// §3 — a customer uploads a review photo straight to Cloud Storage. The API never handles the bytes;
// it signs a short-lived URL with its own service account, so the URL can grant no more than that
// account holds.
export const storageAccess: Scene = {
  id: 'storage-access',
  title: 'Uniform access and signed URLs',
  flow: 'TB',
  stretch: true,
  padding: 0.17,
  nodes: [
    {
      id: 'flow',
      label: 'An upload that bypasses the API',
      pattern: 'service',
      cols: 2,
      children: [
        { id: 's1', label: '1 · Browser asks', sub: 'asks the API for an upload URL', icon: 'users' },
        { id: 's2', label: '2 · API signs', sub: 'PUT only, one name, 10 min', icon: 'key' },
        { id: 's3', label: '3 · Browser uploads', sub: 'PUT straight to the bucket', icon: 'box' },
        { id: 's4', label: '4 · URL expires', sub: 'useless after 10 minutes', icon: 'clock' },
      ],
    },
    {
      id: 'sign',
      kind: 'code',
      filename: 'api.py (excerpt)',
      label: `blob = bucket.blob(f"review-photos/{review_id}.jpg")
url = blob.generate_signed_url(
    version="v4", method="PUT",
    expiration=timedelta(minutes=10),       # V4 allows up to 7 days
    content_type="image/jpeg",
)  # signed as the API's service account: needs create on this bucket`,
    },
    {
      id: 'controls',
      label: 'Bucket-level controls',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'ubla', label: 'Uniform access', sub: 'IAM only; object ACLs off', icon: 'shieldcheck' },
        { id: 'pap', label: 'No public access', sub: 'prevention blocks allUsers', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'flow', target: 'sign', label: 'step 2' },
    { source: 'sign', target: 'controls' },
  ],
}
