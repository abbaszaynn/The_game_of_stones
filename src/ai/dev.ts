import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-geological-reports.ts';
import '@/ai/flows/answer-investor-queries.ts';
import '@/ai/flows/provide-realtime-news-summary.ts';