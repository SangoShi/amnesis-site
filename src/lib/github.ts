const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'SangoShi';
const GITHUB_REPO = process.env.GITHUB_REPO || 'amnesis-site';
const GITHUB_BRANCH = 'main';

async function githubFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return res;
}

export async function getFile(path: string): Promise<{ content: string; sha: string } | null> {
  const res = await githubFetch(`/contents/${path}?ref=${GITHUB_BRANCH}`);
  if (!res.ok) return null;
  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { content, sha: data.sha };
}

export async function createFile(path: string, content: string, message: string) {
  const res = await githubFetch(`/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      branch: GITHUB_BRANCH,
    }),
  });
  return res.ok;
}

export async function updateFile(path: string, content: string, sha: string, message: string) {
  const res = await githubFetch(`/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: Buffer.from(content).toString('base64'),
      sha,
      branch: GITHUB_BRANCH,
    }),
  });
  return res.ok;
}

export async function deleteFile(path: string, sha: string, message: string) {
  const res = await githubFetch(`/contents/${path}`, {
    method: 'DELETE',
    body: JSON.stringify({
      message,
      sha,
      branch: GITHUB_BRANCH,
    }),
  });
  return res.ok;
}

export async function listFiles(dir: string): Promise<{ name: string; path: string; sha: string }[]> {
  const res = await githubFetch(`/contents/${dir}?ref=${GITHUB_BRANCH}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.filter((f: { type: string; name: string }) => f.type === 'file' && f.name.endsWith('.mdx'));
}
