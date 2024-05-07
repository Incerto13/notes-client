import { LabelFormFieldProps, NoteFormFieldProps } from "../../types";
import { TextField } from "@material-ui/core";

export const NoteFormField: React.FC<NoteFormFieldProps> = ({
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

export const LabelFormField: React.FC<LabelFormFieldProps> = ({
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
          margin="normal"
          variant="outlined"
          {...register(name, { valueAsNumber })}
      />
      <p style={{ color: 'red' }}>{error && <span className="error-message">{error.message}</span>}</p>
    </>
  );
  export default NoteFormField;