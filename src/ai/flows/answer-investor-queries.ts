'use server';
/**
 * @fileOverview An AI agent that answers investor queries about mining companies.
 *
 * - answerInvestorQuery - A function that handles investor queries.
 * - AnswerInvestorQueryInput - The input type for the answerInvestorQuery function.
 * - AnswerInvestorQueryOutput - The return type for the answerInvestorQuery function.
 */

import {ai} from '@/ai/genkit';
import {getCompanies, getCompanyById} from '@/lib/data';
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

const getCompaniesInfo = ai.defineTool(
  {
    name: 'getCompaniesInfo',
    description:
      'Get a list of all mining companies and their detailed information. Use this to answer questions about company details, projects, leadership, and documents. This tool can also access the text content of available reports.',
    inputSchema: z.object({}),
    outputSchema: z.any(),
  },
  async () => {
    console.log(`[getCompaniesInfo] Getting info for all companies`);
    const companies = await getCompanies();
    // We only want to return serializable data.
    // The `images` property can contain placeholder IDs which get resolved to full image objects
    // with non-serializable data. Let's just remove it.
    return companies.map(({ images, ...rest }) => rest);
  }
);

const prompt = ai.definePrompt({
  name: 'answerInvestorQueryPrompt',
  input: {schema: AnswerInvestorQueryInputSchema},
  output: {schema: AnswerInvestorQueryOutputSchema},
  tools: [getCompaniesInfo],
  prompt: `You are an AI assistant specialized in answering investor queries about mining companies.
You have access to a tool called 'getCompaniesInfo' that can retrieve detailed information about all the companies in this application, including the text from their documents and reports.

When a user asks a question, use the 'getCompaniesInfo' tool to fetch the data.
Then, use that data, including any relevant text from documents, to formulate your answer. Be concise and helpful.

If the user asks a general question, answer it as a regular AI assistant.

User Query: {{{query}}}`,
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
