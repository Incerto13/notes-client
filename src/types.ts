import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export interface Note {
    id: string
    value: string
}

export type NoteFormData = {
    value: string;
  };

export type LabelFormData = {
    name: string;
};

export const NoteSchema: ZodType<NoteFormData> = z
    .object({
    value: z
        .string()
        .min(20, { message: "Note is too short (min 20 chars)" })
        .max(300, { message: "Note is too long (max 300 chars" }),
})

export type NoteFormFieldProps = {
    type: string;
    placeholder?: string;
    name: ValidFieldNames;
    defaultValue?: string
    register: UseFormRegister<NoteFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

export type ValidFieldNames =
| "value"