import { useIsMobile } from '../../hooks/useMediaQuery';

export interface Column<T = any> {
  key: string;
  header: string;
  mobileHidden?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface ResponsiveTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  cardRender?: (row: T) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

export function ResponsiveTable<T = any>({
  columns,
  data,
  cardRender,
  emptyMessage = 'Brak danych',
  className = '',
}: ResponsiveTableProps<T>) {
  const isMobile = useIsMobile();

  if (data.length === 0) {
    return (
      <div className="data-table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  if (isMobile && cardRender) {
    return (
      <div className={`responsive-cards ${className}`}>
        {data.map((row, i) => (
          <div key={i} className="responsive-card">
            {cardRender(row)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`table-wrapper ${className}`}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={isMobile && col.mobileHidden ? 'hidden' : ''}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={isMobile && col.mobileHidden ? 'hidden' : ''}
                >
                  {col.render ? col.render(row[col.key as keyof T], row) : (row[col.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResponsiveTable;
