'use server';
/**
 * @fileOverview An AI agent that provides a summary of the latest news and announcements related to a specific mining company.
 *
 * - provideRealtimeNewsSummary - A function that provides a summary of the latest news related to a specific mining company.
 * - ProvideRealtimeNewsSummaryInput - The input type for the provideRealtimeNewsSummary function.
 * - ProvideRealtimeNewsSummaryOutput - The return type for the provideRealtimeNewsSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideRealtimeNewsSummaryInputSchema = z.object({
  companyName: z.string().describe('The name of the mining company.'),
});
export type ProvideRealtimeNewsSummaryInput = z.infer<typeof ProvideRealtimeNewsSummaryInputSchema>;

const ProvideRealtimeNewsSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the latest news and announcements related to the mining company.'),
});
export type ProvideRealtimeNewsSummaryOutput = z.infer<typeof ProvideRealtimeNewsSummaryOutputSchema>;

export async function provideRealtimeNewsSummary(input: ProvideRealtimeNewsSummaryInput): Promise<ProvideRealtimeNewsSummaryOutput> {
  return provideRealtimeNewsSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideRealtimeNewsSummaryPrompt',
  input: {schema: ProvideRealtimeNewsSummaryInputSchema},
  output: {schema: ProvideRealtimeNewsSummaryOutputSchema},
  prompt: `You are an AI assistant providing summaries of the latest news for mining companies.
  Summarize the latest news and announcements related to {{companyName}}. The summary should be concise and informative for investors and the general public.
  Consider news articles, press releases, and company statements when creating the summary.
  Provide a summary that is no more than 200 words.
  `,
});

const provideRealtimeNewsSummaryFlow = ai.defineFlow(
  {
    name: 'provideRealtimeNewsSummaryFlow',
    inputSchema: ProvideRealtimeNewsSummaryInputSchema,
    outputSchema: ProvideRealtimeNewsSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
