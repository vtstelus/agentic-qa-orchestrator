import axios from 'axios';

export interface PullRequestDiff {
  prNumber: number;
  title: string;
  changedFiles: string[];
  additions: number;
  deletions: number;
  labels: string[];
}

export class GitHubClient {
  private token = process.env.GITHUB_TOKEN!;
  private baseUrl = 'https://api.github.com';

  private get headers() {
    return { Authorization: `Bearer ${this.token}`, Accept: 'application/vnd.github+json' };
  }

  async getPullRequest(owner: string, repo: string, prNumber: number): Promise<PullRequestDiff> {
    const { data } = await axios.get(`${this.baseUrl}/repos/${owner}/${repo}/pulls/${prNumber}`, { headers: this.headers });
    const { data: files } = await axios.get(`${this.baseUrl}/repos/${owner}/${repo}/pulls/${prNumber}/files`, { headers: this.headers });

    return {
      prNumber,
      title: data.title,
      changedFiles: files.map((f: any) => f.filename),
      additions: data.additions,
      deletions: data.deletions,
      labels: data.labels.map((l: any) => l.name)
    };
  }
}
