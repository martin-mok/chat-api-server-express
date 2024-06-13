import { z, ZodType } from 'zod';
// https://github.com/colinhacks/zod/issues/2807#issuecomment-1977406654

export interface FindMessagesRequest {
  query: { userOrGroupId?: string };
}

export const FindMessagesRequestSchema = z.object({
  query: z.object({
    userOrGroupId: z.string().uuid().optional(),
  }),
}) satisfies ZodType<FindMessagesRequest>;
