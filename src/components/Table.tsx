import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ReactNode } from 'react';
import { Spinner } from './Spinner';

/**
 * One of the properties of the object to display in the table.
 */
type Property<ObjectType extends Record<string, unknown>> =
    | {
          key: keyof ObjectType;
          label: string;
      }
    | keyof ObjectType;

type Props<ObjectType extends Record<string, unknown>> = {
    objects: ObjectType[];
    properties: Property<ObjectType>[];
    onRowClick?: (obj: ObjectType) => void;
    loading?: boolean;
};

function getPropertyKey<ObjectType extends Record<string, unknown>>(
    property: Property<ObjectType>
): string {
    if (
        typeof property === 'string' ||
        typeof property === 'number' ||
        typeof property === 'symbol'
    ) {
        return String(property);
    }

    return String(property.key);
}

function getPropertyLabel<ObjectType extends Record<string, unknown>>(
    property: Property<ObjectType>
): string {
    if (
        typeof property === 'string' ||
        typeof property === 'number' ||
        typeof property === 'symbol'
    ) {
        return String(property);
    }

    return property.label;
}

const hashObject = (obj: Record<string, unknown>) => {
    return Object.keys(obj)
        .sort()
        .map((key) => `${key}:${String(obj[key])}`)
        .join(',');
};

const TableRow = (props: { onClick?: () => void; children: ReactNode }) => (
    <tr
        className={`hover ${props.onClick ? 'cursor-pointer' : ''}`}
        tabIndex={props.onClick ? 0 : -1}
        onClick={props.onClick}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
                props.onClick?.();
            }
        }}
    >
        {props.children}
    </tr>
);

export function Table<ObjectType extends Record<string, unknown>>({
    objects,
    properties,
    onRowClick,
    loading,
}: Props<ObjectType>) {
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
                                <th
                                    key={getPropertyKey(property)}
                                    className="!static"
                                >
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
                            <TableRow
                                key={obj._objectId}
                                onClick={onRowClick?.bind(null, obj)}
                            >
                                {properties.map((property) => (
                                    <td
                                        key={getPropertyKey(property)}
                                        className="max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap"
                                    >
                                        {String(obj[getPropertyKey(property)])}
                                    </td>
                                ))}
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
