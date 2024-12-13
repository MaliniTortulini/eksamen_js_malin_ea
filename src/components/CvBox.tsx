export const CvBox = ({ title, data, children }: { title: React.ReactNode; data: { label: string; value: string | string[] }[]; children?: React.ReactNode }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="border-b pb-4">
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div>
        {data.map(({ label, value }) => (
          <div key={label} className="mb-4">
            <h3 className="text-lg font-semibold">{label}</h3>
            <p>{Array.isArray(value) ? value.join(", ") : value}</p>
          </div>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
};


