import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name);

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <div className="flex flex-col gap-1 mt-3">
      <label>{label}</label>
      <input className="rounded" {...field} {...props} onBlur={handleBlur} />
      {meta.touched &&  meta.error && (
        <div className="text-red-600 text-sm">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomInput;