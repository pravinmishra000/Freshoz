import { z } from 'genkit';

export const ManageCartInputSchema = z.object({
    query: z.string().describe('The user\'s natural language request for managing their cart.'),
});
export type ManageCartInput = z.infer<typeof ManageCartInputSchema>;

export const ManageCartOutputSchema = z.object({
    action: z.enum(['added', 'removed', 'updated', 'not_found', 'cart_status', 'checkout', 'clarification'])
        .describe('The action performed by the assistant.'),
    message: z.string().describe('The response message to show to the user.'),
    cartItems: z.array(z.object({
        name: z.string(),
        quantity: z.string(),
        price: z.number(),
    })).optional().describe('The current items in the cart, if requested.'),
    totalPrice: z.number().optional().describe('The total price of the cart, if requested.'),
});
export type ManageCartOutput = z.infer<typeof ManageCartOutputSchema>;
