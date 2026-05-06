import axios from 'axios';

export interface DatadogMetric {
  metricName: string;
  value: number;
  timestamp: Date;
  tags: string[];
}

export class DatadogClient {
  private apiKey = process.env.DATADOG_API_KEY!;
  private baseUrl = 'https://api.datadoghq.com/api/v1';

  async queryMetric(query: string, from: number, to: number): Promise<DatadogMetric[]> {
    const { data } = await axios.get(`${this.baseUrl}/query`, {
      params: { query, from, to },
      headers: { 'DD-API-KEY': this.apiKey }
    });

    return data.series.map((s: any) => ({
      metricName: s.metric,
      value: s.pointlist?.[0]?.[1] || 0,
      timestamp: new Date(s.pointlist?.[0]?.[0] * 1000),
      tags: s.tag_set || []
    }));
  }
}
