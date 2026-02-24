export interface FieldChange {
    field: string;
    oldValue: any;
    newValue: any;
}

export function getChangedFields(oldObj: any, newObj: any): FieldChange[] {

    const changes: FieldChange[] = [];

    if (!oldObj || !newObj) return changes;

    const keys = Object.keys(newObj);

    for (const key of keys) {

        const oldValue = oldObj?.[key];
        const newValue = newObj?.[key];

        if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
            changes.push({
                field: key,
                oldValue,
                newValue
            });
        }

    }

    return changes;

}
