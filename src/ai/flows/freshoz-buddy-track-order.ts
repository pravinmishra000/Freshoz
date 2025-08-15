'use server';
/**
 * @fileOverview A flow to track the status of an order using Freshoz Buddy.
 *
 * - trackOrderStatus - A function that tracks the order status.
 * - TrackOrderStatusInput - The input type for the trackOrderStatus function.
 * - TrackOrderStatusOutput - The return type for the trackOrderStatus function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrackOrderStatusInputSchema = z.object({
  orderId: z.string().describe('The ID of the order to track.'),
  userId: z.string().describe('The ID of the user requesting the order status.'),
});
export type TrackOrderStatusInput = z.infer<typeof TrackOrderStatusInputSchema>;

const TrackOrderStatusOutputSchema = z.object({
  orderStatus: z.string().describe('The current status of the order.'),
  deliveryETA: z.string().optional().describe('The estimated time of arrival for the order, if available.'),
});
export type TrackOrderStatusOutput = z.infer<typeof TrackOrderStatusOutputSchema>;

export async function trackOrderStatus(input: TrackOrderStatusInput): Promise<TrackOrderStatusOutput> {
  return trackOrderStatusFlow(input);
}

const getOrderStatus = ai.defineTool({
  name: 'getOrderStatus',
  description: 'Retrieves the current status and ETA of a specific order for a user.',
  inputSchema: z.object({
    orderId: z.string().describe('The ID of the order to retrieve.'),
    userId: z.string().describe('The ID of the user requesting the order status.'),
  }),
  outputSchema: z.object({
    orderStatus: z.string().describe('The current status of the order.'),
    deliveryETA: z.string().optional().describe('The estimated time of arrival for the order, if available.'),
  }),
},
async (input) => {
    // TODO: Implement the actual logic to fetch order status and ETA from Firebase or any other data source
    // For now, return a dummy response
    console.log("Fetching order status for orderId: " + input.orderId + " and userId: " + input.userId);
    return {
      orderStatus: 'Order placed',
      deliveryETA: '30 minutes',
    };
  }
);

const prompt = ai.definePrompt({
  name: 'trackOrderStatusPrompt',
  tools: [getOrderStatus],
  input: {schema: TrackOrderStatusInputSchema},
  output: {schema: TrackOrderStatusOutputSchema},
  prompt: `You are Freshoz Buddy, an AI assistant helping users track their orders.
  The user wants to know the status of order ID {{{orderId}}}.
  Call the getOrderStatus tool to find out the order status, and respond to the user with the order status and ETA if available.
  Make sure to include order id in your response.
  If the order id does not exist respond with order not found message.
  `,
});

const trackOrderStatusFlow = ai.defineFlow(
  {
    name: 'trackOrderStatusFlow',
    inputSchema: TrackOrderStatusInputSchema,
    outputSchema: TrackOrderStatusOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
