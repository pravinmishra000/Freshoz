'use server';

/**
 * @fileOverview Freshoz Buddy AI Assistant Flow.
 *
 * - getCheaperAlternatives - A function that suggests cheaper alternatives for a given product.
 * - CheaperAlternativesInput - The input type for the getCheaperAlternatives function.
 * - CheaperAlternativesOutput - The return type for the getCheaperAlternatives function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheaperAlternativesInputSchema = z.object({
  productName: z.string().describe('The name of the product for which to find cheaper alternatives.'),
});
export type CheaperAlternativesInput = z.infer<typeof CheaperAlternativesInputSchema>;

const CheaperAlternativesOutputSchema = z.object({
  alternatives: z.array(z.string()).describe('A list of cheaper alternative product names.'),
  reasoning: z.string().describe('The reasoning behind suggesting these alternatives.'),
});
export type CheaperAlternativesOutput = z.infer<typeof CheaperAlternativesOutputSchema>;

export async function getCheaperAlternatives(input: CheaperAlternativesInput): Promise<CheaperAlternativesOutput> {
  return cheaperAlternativesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cheaperAlternativesPrompt',
  input: {schema: CheaperAlternativesInputSchema},
  output: {schema: CheaperAlternativesOutputSchema},
  prompt: `You are Freshoz Buddy, a helpful AI assistant for the Freshoz grocery delivery app. A user is looking for cheaper alternatives to the product: {{{productName}}}.

Suggest 3 cheaper alternatives that are available in the Freshoz catalog. Provide a brief reasoning for each suggestion.

Format your response as a JSON object with "alternatives" (an array of product names) and "reasoning" (a string explaining the suggestions) fields.
`,
});

const cheaperAlternativesFlow = ai.defineFlow(
  {
    name: 'cheaperAlternativesFlow',
    inputSchema: CheaperAlternativesInputSchema,
    outputSchema: CheaperAlternativesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
