import { z } from 'zod';

const validAliasRegex = /^[a-z0-9-_]+$/i;

const baseUrlRegex = /tny-snls.xyz\/s\/\w+/i;

function containsBaseUrl(url: string) {
    const match = baseUrlRegex.test(url) || baseUrlRegex.test(decodeURI(url));

    return !match;
}

const slurRegex =
    /(fag(g|got|tard)?\b|cocks?sucker(s|ing)?|ni((g{2,}|q)+|[gq]{2,})[e3r]+(s|z)?|mudslime?s?|kikes?|\bspi(c|k)s?\b|\bchinks?|gooks?|bitch(es|ing|y)?|whor(es?|ing)|\btr(a|@)nn?(y|ies?)|\b(b|re|r)tard(ed)?s?)/i;

function containsSlur(alias: string) {
    return !slurRegex.test(alias);
}

export const createSnailSchema = z.object({
    url: z.string().url().refine(containsBaseUrl, "you can't create a looping snail!"),
    alias: z
        .string()
        .min(3)
        .max(20)
        .regex(validAliasRegex, 'alias can contain only letters, numbers, hyphens (-) and underscores (_)')
        .refine(containsSlur, "you can't give a snail such a bad name!")
        .optional(),
});

export type CreateSnailDTO = z.infer<typeof createSnailSchema>;

export const createClickSchema = z.object({
    snailAlias: z.string(),
    ip: z.string().optional(),
    secret: z.string(),
});

export type CreateClickDTO = z.infer<typeof createClickSchema>;
