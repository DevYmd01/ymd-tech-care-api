export function diffById<
    TExisting extends Record<string, any>,
    TIncoming extends Record<string, any>,
    K extends keyof TExisting & keyof TIncoming
>(
    existing: TExisting[],
    incoming: TIncoming[],
    idKey: K
): {
    toCreate: TIncoming[];
    toUpdate: TIncoming[];
    toDelete: TExisting[];
} {

    const safeIncoming = (incoming ?? []).filter(Boolean);

    const incomingIds = new Set<number>(
        safeIncoming
            .map(i => i[idKey])
            .filter(id => id != null)
            .map(id => Number(id))
    );

    const toCreate = safeIncoming.filter(i => i[idKey] == null);

    const toUpdate = safeIncoming.filter(i => i[idKey] != null);

    const toDelete = (existing ?? []).filter(
        e => !incomingIds.has(Number(e[idKey]))
    );

    return { toCreate, toUpdate, toDelete };
}
