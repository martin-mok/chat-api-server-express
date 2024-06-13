import { z, ZodType } from 'zod';
// https://github.com/colinhacks/zod/issues/2807#issuecomment-1977406654

export interface JoinGroup {
  user: string;
  group: string;
}

export interface JoinGroupRequest {
  body: JoinGroup;
}

export const JoinGroupRequestSchema = z.object({
  body: z
    .object({
      user: z.string(),
      group: z.string(),
    })
    .strict(),
}) satisfies ZodType<JoinGroupRequest>;
