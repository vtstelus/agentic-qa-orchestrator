import axios from 'axios';
import { config } from '../../../../shared/config';

export interface VectorDocument {
  id: string;
  content: string;
  metadata: Record<string, unknown>;
  embedding?: number[];
}

export class VectorStore {
  private url = config.vectorStore.url;
  private collection = config.vectorStore.collection;

  async upsert(doc: VectorDocument): Promise<void> {
    await axios.put(`${this.url}/collections/${this.collection}/points`, {
      points: [{ id: doc.id, payload: { content: doc.content, ...doc.metadata }, vector: doc.embedding || [] }]
    });
  }

  async search(queryVector: number[], limit = 5): Promise<VectorDocument[]> {
    const { data } = await axios.post(`${this.url}/collections/${this.collection}/points/search`, {
      vector: queryVector, limit, with_payload: true
    });
    return data.result.map((r: any) => ({ id: r.id, content: r.payload.content, metadata: r.payload }));
  }
}
