import { useState } from "react";

export type SelectItem = { name: string; _uuid: string };
type SelectProps = {
  items: SelectItem[];
  label: string;
  placeholder: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({
  items,
  label,
  defaultValue,
  placeholder,
  ...props
}: SelectProps) => {
  const [selected, setSelected] = useState(defaultValue);

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        className="select select-bordered"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        {...props}
      >
        <option value="">{placeholder}</option>

        {items.map((item) => (
          <option key={item._uuid} value={item._uuid}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="label">
        <span className="label-text-alt"></span>
      </div>
    </label>
  );
};