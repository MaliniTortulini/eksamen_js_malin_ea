type InputProps = {
  label: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ label, errorMessage, ...props }: InputProps) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input className="input input-bordered w-full" {...props} />
      <div className="label">
        <span className="label-text-alt">{errorMessage}</span>
      </div>
    </label>
  );
};
