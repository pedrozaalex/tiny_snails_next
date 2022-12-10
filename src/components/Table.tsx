import { useAutoAnimate } from '@formkit/auto-animate/react';

type Props<ObjectType> = {
    objects: ObjectType[];
    properties: {
        key: keyof ObjectType;
        label: string;
    }[];
    onRowClick?: (obj: ObjectType) => void;
};

export function Table<T>({ objects, properties, onRowClick }: Props<T>) {
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>();

    return (
        <>
            <div className="relative flex max-h-full w-full flex-col items-center gap-8 overflow-auto rounded-lg border-2 border-neutral-content bg-base-100">
                <table className="custom-table table w-full text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            {properties.map((property) => (
                                <th key={String(property.key)}>
                                    {property.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody ref={parentRef}>
                        {objects.map((obj, index) => {
                            return (
                                <tr
                                    key={String(obj[properties[0].key])}
                                    className={`hover ${
                                        onRowClick ? 'cursor-pointer' : ''
                                    }`}
                                    tabIndex={onRowClick ? 0 : -1}
                                    onClick={() => onRowClick?.(obj)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            onRowClick?.(obj);
                                        }
                                    }}
                                >
                                    <th>{index + 1}</th>
                                    {properties.map((property) => (
                                        <td key={String(property.key)}>
                                            {String(obj[property.key])}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}
