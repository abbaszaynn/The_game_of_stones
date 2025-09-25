'use server';
/**
 * @fileOverview An AI agent that answers investor queries about mining companies.
 *
 * - answerInvestorQuery - A function that handles investor queries.
 * - AnswerInvestorQueryInput - The input type for the answerInvestorQuery function.
 * - AnswerInvestorQueryOutput - The return type for the answerInvestorQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerInvestorQueryInputSchema = z.object({
  query: z.string().describe('The investor query.'),
});
export type AnswerInvestorQueryInput = z.infer<typeof AnswerInvestorQueryInputSchema>;

const AnswerInvestorQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the investor query.'),
});
export type AnswerInvestorQueryOutput = z.infer<typeof AnswerInvestorQueryOutputSchema>;

export async function answerInvestorQuery(input: AnswerInvestorQueryInput): Promise<AnswerInvestorQueryOutput> {
  return answerInvestorQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerInvestorQueryPrompt',
  input: {schema: AnswerInvestorQueryInputSchema},
  output: {schema: AnswerInvestorQueryOutputSchema},
  prompt: `You are an AI assistant specialized in answering investor queries about mining companies.
  You have access to the company profiles, project details, geological reports, licenses, news, and documents.
  Use this information to provide accurate and insightful answers to investor questions.

  Query: {{{query}}}`,
});

const answerInvestorQueryFlow = ai.defineFlow(
  {
    name: 'answerInvestorQueryFlow',
    inputSchema: AnswerInvestorQueryInputSchema,
    outputSchema: AnswerInvestorQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
