'use server';

/**
 * @fileOverview Summarizes geological reports for quick understanding of key findings.
 *
 * - summarizeGeologicalReport - A function that summarizes a geological report.
 * - SummarizeGeologicalReportInput - The input type for the summarizeGeologicalReport function.
 * - SummarizeGeologicalReportOutput - The return type for the summarizeGeologicalReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeGeologicalReportInputSchema = z.object({
  reportDataUri: z
    .string()
    .describe(
      'The geological report as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // keep the backslashes, necessary to avoid errors.
    ),
});
export type SummarizeGeologicalReportInput = z.infer<
  typeof SummarizeGeologicalReportInputSchema
>;

const SummarizeGeologicalReportOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the geological report.'),
});
export type SummarizeGeologicalReportOutput = z.infer<
  typeof SummarizeGeologicalReportOutputSchema
>;

export async function summarizeGeologicalReport(
  input: SummarizeGeologicalReportInput
): Promise<SummarizeGeologicalReportOutput> {
  return summarizeGeologicalReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeGeologicalReportPrompt',
  input: {schema: SummarizeGeologicalReportInputSchema},
  output: {schema: SummarizeGeologicalReportOutputSchema},
  prompt: `You are an expert geologist. Summarize the key findings of the following geological report. Be concise and focus on the most important information for investors.

Geological Report: {{media url=reportDataUri}}`,
});

const summarizeGeologicalReportFlow = ai.defineFlow(
  {
    name: 'summarizeGeologicalReportFlow',
    inputSchema: SummarizeGeologicalReportInputSchema,
    outputSchema: SummarizeGeologicalReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
