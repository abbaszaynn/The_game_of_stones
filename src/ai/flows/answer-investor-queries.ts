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

const getCompanyInfo = ai.defineTool(
  {
    name: 'getCompanyInfo',
    description:
      'Get information about a specific mining company. Use this to answer questions about company details, projects, leadership, and documents.',
    inputSchema: z.object({
      companyName: z
        .string()
        .describe(
          'The name of the company to retrieve information for. Try to match it with one of the available company names.'
        ),
    }),
    outputSchema: z.any(),
  },
  async ({companyName}) => {
    console.log(`[getCompanyInfo] Getting info for: ${companyName}`);
    const companies = await getCompanies();
    // Find a company whose name includes the provided companyName, case-insensitive
    const company = companies.find(c =>
      c.name.toLowerCase().includes(companyName.toLowerCase())
    );

    if (company) {
      // Use getCompanyById to get the full details, which is more robust
      const fullCompanyDetails = await getCompanyById(company.id);
      return fullCompanyDetails || {error: 'Company details not found.'};
    }

    return {
      error: `Company "${companyName}" not found. Available companies are: ${companies
        .map(c => c.name)
        .join(', ')}`,
    };
  }
);

const prompt = ai.definePrompt({
  name: 'answerInvestorQueryPrompt',
  input: {schema: AnswerInvestorQueryInputSchema},
  output: {schema: AnswerInvestorQueryOutputSchema},
  tools: [getCompanyInfo],
  prompt: `You are an AI assistant specialized in answering investor queries about mining companies.
You have access to a tool called 'getCompanyInfo' that can retrieve detailed information about the companies in this application.

When a user asks a question about a specific company, use the 'getCompanyInfo' tool to fetch the data.
Then, use that data to formulate your answer. Be concise and helpful.

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
