'use server';
/**
 * @fileOverview An AI agent for checking product availability.
 *
 * - checkProductAvailability - A function that handles checking the availability of a product.
 * - CheckProductAvailabilityInput - The input type for the checkProductAvailability function.
 * - CheckProductAvailabilityOutput - The return type for the checkProductAvailability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckProductAvailabilityInputSchema = z.object({
  productName: z.string().describe('The name of the product to check availability for.'),
});
export type CheckProductAvailabilityInput = z.infer<typeof CheckProductAvailabilityInputSchema>;

const CheckProductAvailabilityOutputSchema = z.object({
  isAvailable: z.boolean().describe('Whether the product is available.'),
  availabilityMessage: z.string().describe('A message indicating the product availability status.'),
});
export type CheckProductAvailabilityOutput = z.infer<typeof CheckProductAvailabilityOutputSchema>;

export async function checkProductAvailability(input: CheckProductAvailabilityInput): Promise<CheckProductAvailabilityOutput> {
  return checkProductAvailabilityFlow(input);
}

const checkProductAvailabilityPrompt = ai.definePrompt({
  name: 'checkProductAvailabilityPrompt',
  input: {schema: CheckProductAvailabilityInputSchema},
  output: {schema: CheckProductAvailabilityOutputSchema},
  prompt: `You are Freshoz Buddy, an AI assistant for the Freshoz grocery delivery app. A user is asking whether a specific product is available.

Determine whether the product is available, and set the isAvailable output field accordingly.
Also set the availabilityMessage field to a user-friendly message indicating the product's availability status.

Product name: {{{productName}}}`,
});

const checkProductAvailabilityFlow = ai.defineFlow(
  {
    name: 'checkProductAvailabilityFlow',
    inputSchema: CheckProductAvailabilityInputSchema,
    outputSchema: CheckProductAvailabilityOutputSchema,
  },
  async input => {
    const {output} = await checkProductAvailabilityPrompt(input);
    return output!;
  }
);
