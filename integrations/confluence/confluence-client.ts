import axios from 'axios';

export class ConfluenceClient {
  private baseUrl = process.env.CONFLUENCE_BASE_URL!;
  private token = process.env.CONFLUENCE_API_TOKEN!;

  async getPage(pageId: string): Promise<{ title: string; body: string }> {
    const { data } = await axios.get(`${this.baseUrl}/wiki/rest/api/content/${pageId}?expand=body.storage`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    return { title: data.title, body: data.body.storage.value };
  }

  async createPage(spaceKey: string, title: string, htmlContent: string): Promise<string> {
    const { data } = await axios.post(`${this.baseUrl}/wiki/rest/api/content`, {
      type: 'page', title, space: { key: spaceKey },
      body: { storage: { value: htmlContent, representation: 'storage' } }
    }, { headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' } });
    return data.id;
  }
}
