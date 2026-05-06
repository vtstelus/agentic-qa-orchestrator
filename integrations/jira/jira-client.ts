import axios from 'axios';
import { Requirement } from '../../shared/types/requirement.types';

export class JiraClient {
  private baseUrl = process.env.JIRA_BASE_URL!;
  private token = process.env.JIRA_API_TOKEN!;

  private get headers() {
    return { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' };
  }

  async getStory(issueKey: string): Promise<Requirement> {
    const { data } = await axios.get(`${this.baseUrl}/rest/api/3/issue/${issueKey}`, { headers: this.headers });
    return {
      id: data.id,
      jiraKey: data.key,
      title: data.fields.summary,
      description: data.fields.description?.content?.[0]?.content?.[0]?.text || '',
      acceptanceCriteria: (data.fields.customfield_10016 || '').split('\n').filter(Boolean),
      riskTags: [],
      priority: data.fields.priority?.name?.toLowerCase() || 'medium',
      createdAt: new Date(data.fields.created)
    };
  }

  async addComment(issueKey: string, comment: string): Promise<void> {
    await axios.post(
      `${this.baseUrl}/rest/api/3/issue/${issueKey}/comment`,
      { body: { type: 'doc', version: 1, content: [{ type: 'paragraph', content: [{ type: 'text', text: comment }] }] } },
      { headers: this.headers }
    );
  }
}
