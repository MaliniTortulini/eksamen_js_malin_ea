export const Tab = ({
  label,
  children,
  defaultChecked,
}: {
  label: string;
  children: React.ReactNode;
  defaultChecked?: boolean;
}) => {
  return (
    <>
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab"
        aria-label={label}
        defaultChecked={defaultChecked}
      />
      <div
        role="tabpanel"
        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
      >
        {children}
      </div>
    </>
  );
};
