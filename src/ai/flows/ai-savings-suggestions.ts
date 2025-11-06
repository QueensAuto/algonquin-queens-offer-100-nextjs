'use server';

/**
 * @fileOverview AI-powered savings suggestions flow.
 *
 * - getSavingsSuggestions - A function that takes the current repair cost and provides suggestions to reach the next discount tier.
 * - SavingsSuggestionsInput - The input type for the getSavingsSuggestions function.
 * - SavingsSuggestionsOutput - The return type for the getSavingsSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SavingsSuggestionsInputSchema = z.object({
  currentCost: z
    .number()
    .describe('The current estimated repair cost.'),
});
export type SavingsSuggestionsInput = z.infer<typeof SavingsSuggestionsInputSchema>;

const SavingsSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Suggestions for services to add to reach the next savings tier.'),
});
export type SavingsSuggestionsOutput = z.infer<typeof SavingsSuggestionsOutputSchema>;

export async function getSavingsSuggestions(input: SavingsSuggestionsInput): Promise<SavingsSuggestionsOutput> {
  return savingsSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'savingsSuggestionsPrompt',
  input: {schema: SavingsSuggestionsInputSchema},
  output: {schema: SavingsSuggestionsOutputSchema},
  prompt: `You are an expert auto repair advisor. Given the customer's current estimated repair cost, suggest specific services or combinations of services that will help them reach the next savings tier.

Current Repair Cost: {{{currentCost}}}

Respond with a list of suggestions.  Be brief.
`,
});

const savingsSuggestionsFlow = ai.defineFlow(
  {
    name: 'savingsSuggestionsFlow',
    inputSchema: SavingsSuggestionsInputSchema,
    outputSchema: SavingsSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
