import { NoteFormFieldProps } from "../types";
import { TextField } from "@material-ui/core";

const FormField: React.FC<NoteFormFieldProps> = ({
  type,
  placeholder,
  name,
  defaultValue,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <TextField
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        multiline
        minRows="4"
        margin="normal"
        variant="outlined"
        {...register(name, { valueAsNumber })}
    />
    <p style={{ color: 'red' }}>{error && <span className="error-message">{error.message}</span>}</p>
  </>
);
export default FormField;