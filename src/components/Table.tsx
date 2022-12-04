import { useAutoAnimate } from '@formkit/auto-animate/react';

type Props<ObjectType> = {
    objects: ObjectType[];
    properties: {
        key: keyof ObjectType;
        label: string;
    }[];
    onRowClick?: (obj: ObjectType) => void;
};

export const Table = <T extends { id: number }>({
    objects,
    properties,
    onRowClick = () => void 0,
}: Props<T>) => {
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
                                    key={obj.id}
                                    className="hover cursor-pointer"
                                    onClick={onRowClick.bind(null, obj)}
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
};
