import { z, ZodType } from 'zod';
// https://github.com/colinhacks/zod/issues/2807#issuecomment-1977406654

export interface JoinGroupRequest {
  body: { groupId: string };
}

export const JoinGroupRequestSchema = z.object({
  body: z
    .object({
      groupId: z.string().uuid(),
    })
    .strict(),
}) satisfies ZodType<JoinGroupRequest>;
