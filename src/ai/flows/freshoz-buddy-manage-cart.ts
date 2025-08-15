'use server';
/**
 * @fileOverview An AI agent for managing the user's shopping cart.
 *
 * - manageCart - A function that handles adding, removing, and updating items in the cart.
 * - ManageCartInput - The input type for the manageCart function.
 * - ManageCartOutput - The return type for the manageCart function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ManageCartInputSchema, ManageCartOutputSchema } from '@/ai/schema';
import type { ManageCartInput, ManageCartOutput } from '@/ai/schema';


// Define schemas for the tool
const ProductLookupInputSchema = z.object({
  productName: z.string().describe('The name of the product to look up.'),
  quantity: z.string().optional().describe('The quantity or weight of the product, e.g., "2 kg" or "3"'),
});

const ProductLookupOutputSchema = z.object({
  found: z.boolean().describe('Whether a matching product was found.'),
  product: z
    .object({
      id: z.string(),
      name_en: z.string(),
      price: z.number(),
      pack_size: z.string(),
    })
    .optional()
    .describe('The product details if found.'),
  alternatives: z.array(z.string()).optional().describe('Suggested alternative products if the requested one is not found.'),
});

// Tool to find products in the catalog
const productLookupTool = ai.defineTool(
  {
    name: 'productLookup',
    description: 'Looks up a product in the catalog to add, remove, or update in the cart. Finds alternatives if not available.',
    inputSchema: ProductLookupInputSchema,
    outputSchema: ProductLookupOutputSchema,
  },
  async ({ productName, quantity }) => {
    console.log(`Looking up product: ${productName}`);
    const lowerCaseQuery = productName.toLowerCase();
    
    // Fuzzy search for product
    let foundProducts = products.filter(p => p.name_en.toLowerCase().includes(lowerCaseQuery));

    if (foundProducts.length > 0) {
      const bestMatch = foundProducts[0];
      return {
        found: true,
        product: {
          id: bestMatch.id,
          name_en: bestMatch.name_en,
          price: bestMatch.price,
          pack_size: bestMatch.pack_size,
        },
      };
    } else {
        // Simple alternative suggestion
      const alternatives = products
        .map(p => p.name_en)
        .slice(0, 3);
      return {
        found: false,
        alternatives: alternatives,
      };
    }
  }
);


const manageCartPrompt = ai.definePrompt({
    name: 'manageCartPrompt',
    input: { schema: ManageCartInputSchema },
    output: { schema: ManageCartOutputSchema },
    tools: [productLookupTool],
    prompt: `You are Freshoz Buddy, an expert cart management AI for a grocery app.
Your task is to understand the user's request in English or Hinglish and perform cart operations using the available tools.

User's request: {{{query}}}

Follow these rules:
1.  **Add Item**: If the user wants to add an item, use the \`productLookup\` tool to find it.
    - If found, construct the response: "✅ [item] ([quantity]) added to your cart. Do you want to add more items or checkout?"
    - If not found, respond with: "Sorry, [item] is not available. Would you like one of these alternatives: [alternatives]?"
    - Default quantity is 1 if not specified.
2.  **Remove Item**: If the user wants to remove an item, confirm with: "Removed [item] from your cart." (Simulated).
3.  **Update Quantity**: If the user wants to update an item's quantity, confirm with: "Updated [item] quantity to [quantity]." (Simulated).
4.  **Show Cart**: If the user asks to see their cart, respond with a summary. (Simulate with a few items).
5.  **Checkout**: If the user wants to checkout, respond with: "Proceeding to checkout."
6.  **Be Conversational**: Keep your responses short, friendly, and helpful.
`,
});


const manageCartFlow = ai.defineFlow(
  {
    name: 'manageCartFlow',
    inputSchema: ManageCartInputSchema,
    outputSchema: ManageCartOutputSchema,
  },
  async (input) => {
    console.log('Manage Cart Flow initiated with query:', input.query);
    const { output } = await manageCartPrompt(input);
    
    // In a real app, you would interact with a cart state management service here.
    // For now, we rely on the LLM to generate the correct simulated response.
    if (!output) {
        return {
            action: 'clarification',
            message: "I'm sorry, I didn't understand that. Could you please rephrase?"
        }
    }
    console.log('Manage Cart Flow completed with output:', output);
    return output;
  }
);

export async function manageCart(input: ManageCartInput): Promise<ManageCartOutput> {
    return manageCartFlow(input);
}
