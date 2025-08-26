const TextInput = ({
  label,
  name,
  type = "text",
  invalid = false,
  errorMessage = "",
  wrapperClass = "",
  inputClass = "",
  disabled = false,
  min,
  step,
  pattern,
  inputMode,
  ...rest
}) => {
  const errorId = `${name}-error`;

  return (
    <div className={`flex flex-col items-start px-2 py-2 ${wrapperClass}`}>
      <label htmlFor={name} className="text-gray-600 font-light">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        disabled={disabled}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        className={`py-2 px-4 border-[.2px] rounded-lg w-full 
          border-gray-300 focus:outline-none
          ${invalid ? "border-red-500 outline-red-500 border-2" : ""}
          ${inputClass}`}
        {...(type === "number"
          ? { min, step, pattern, inputMode: inputMode || "numeric" }
          : {})}
        {...rest}
      />
      {errorMessage && (
        <p id={errorId} className="text-red-500 text-sm mt-1">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default TextInput;
