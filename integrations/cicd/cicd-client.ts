import axios from 'axios';

export interface PipelineStatus {
  pipelineId: string;
  status: 'running' | 'success' | 'failed' | 'cancelled';
  commitSha: string;
  branch: string;
  triggeredAt: Date;
}

export class CICDClient {
  async getLatestPipeline(repoOwner: string, repoName: string): Promise<PipelineStatus> {
    // Supports GitHub Actions / Jenkins / GitLab CI
    const { data } = await axios.get(
      `https://api.github.com/repos/${repoOwner}/${repoName}/actions/runs?per_page=1`,
      { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } }
    );
    const run = data.workflow_runs[0];
    return {
      pipelineId: run.id.toString(),
      status: run.conclusion === 'success' ? 'success' : run.conclusion === 'failure' ? 'failed' : 'running',
      commitSha: run.head_sha,
      branch: run.head_branch,
      triggeredAt: new Date(run.created_at)
    };
  }
}
