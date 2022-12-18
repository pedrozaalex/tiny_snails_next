import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ReactNode } from 'react';
import { Spinner } from './Spinner';

/**
 * One of the properties of the object to display in the table.
 */
type Property =
    | {
          key: string;
          label: string;
      }
    | string;

type Props<ObjectType> = {
    objects: ObjectType[];
    properties: Property[];
    onRowClick?: (obj: ObjectType) => void;
    loading?: boolean;
};

const getPropertyKey = (property: Property) => {
    if (typeof property === 'string') {
        return property;
    }

    return property.key;
};

const getPropertyLabel = (property: Property) => {
    if (typeof property === 'string') {
        return property;
    }

    return property.label;
};

const hashObject = (obj: Record<string, unknown>) => {
    return Object.keys(obj)
        .sort()
        .map((key) => `${key}:${String(obj[key])}`)
        .join(',');
};

const Row = ({
    onClick,
    children,
}: {
    onClick?: () => void;
    children: ReactNode;
}) => (
    <tr
        className={`hover ${onClick ? 'cursor-pointer' : ''}`}
        tabIndex={onClick ? 0 : -1}
        onClick={onClick}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                onClick?.();
            }
        }}
    >
        {children}
    </tr>
);

export function Table<T extends Record<string, unknown>>({
    objects,
    properties,
    onRowClick,
    loading,
}: Props<T>) {
    const [parentRef] = useAutoAnimate<HTMLTableSectionElement>();

    const objectsWithIds = objects.map((obj) => ({
        ...obj,
        _objectId: hashObject(obj),
    }));

    return (
        <>
            <div className="relative flex max-h-full w-full flex-col items-center gap-8 overflow-auto rounded-lg border-2 border-neutral-content bg-base-100">
                <table className="custom-table table w-full text-center">
                    <thead>
                        <tr>
                            {properties.map((property) => (
                                <th key={getPropertyKey(property)}>
                                    {getPropertyLabel(property)}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody ref={parentRef}>
                        {loading && (
                            <tr>
                                <td colSpan={properties.length}>
                                    <div className="flex items-center justify-center gap-2">
                                        <Spinner />
                                        <span>loading...</span>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {objectsWithIds.map((obj) => (
                            <Row
                                key={obj._objectId}
                                onClick={() => onRowClick?.(obj)}
                            >
                                {properties.map((property) => (
                                    <td key={getPropertyKey(property)}>
                                        {String(obj[getPropertyKey(property)])}
                                    </td>
                                ))}
                            </Row>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
