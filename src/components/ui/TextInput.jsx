const TextInput = ({
  label,
  name,
  type = "text",
  error = false,
  wrapperClass = "",
  inputClass = "",
  disabled = false,
  ...rest
}) => {
  return (
    <div className={`flex flex-col items-start px-2 py-2 ${wrapperClass}`}>
      <label htmlFor={name} className="text-gray-400 font-light">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        className={`py-2 px-4 border-[.2px] rounded-lg w-full 
          focus:outline-purple-400 border-gray-300 focus:outline-none
          ${error ? "border-red-500 outline-red-500 border-2" : ""}
          ${inputClass}`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
