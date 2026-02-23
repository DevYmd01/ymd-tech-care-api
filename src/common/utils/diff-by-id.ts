export function diffById<
    TExisting extends Record<string, any>,
    TIncoming extends Record<string, any>,
    K extends keyof any
>(
    existing: TExisting[],
    incoming: TIncoming[],
    idKey: K
) {
    const incomingIds = new Set(
        incoming
            .map(i => (i as any)[idKey])
            .filter(id => id !== undefined && id !== null)
    );

    const toCreate = incoming.filter(i => !(i as any)[idKey]);
    const toUpdate = incoming.filter(i => (i as any)[idKey]);

    const toDelete = existing.filter(
        e => !incomingIds.has((e as any)[idKey])
    );

    return { toCreate, toUpdate, toDelete };
}
