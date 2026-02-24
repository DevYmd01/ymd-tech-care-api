export function diffFields(oldObj: any, newObj: any) {

    const changes: {
        field: string
        oldValue: any
        newValue: any
    }[] = [];

    const keys = new Set([
        ...Object.keys(oldObj || {}),
        ...Object.keys(newObj || {})
    ]);

    keys.forEach(key => {

        if (oldObj?.[key] !== newObj?.[key]) {

            changes.push({
                field: key,
                oldValue: oldObj?.[key] ?? null,
                newValue: newObj?.[key] ?? null
            });

        }

    });

    return changes;

}
