export const UserTable = ({
  children,
  headers,
}: {
  children: React.ReactNode;
  headers: string[];
}) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="capitalize">
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </>
  );
};
