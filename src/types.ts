import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod";

export interface Note {
    id: string
    value: string
    labels?: NoteLabel[]
}

export interface Label {
    id: string
    name: string
}

export interface NoteLabel {
    noteId: string
    labelId: string
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

export const LabelSchema: ZodType<LabelFormData> = z
    .object({
    name: z
        .string()
        .min(2, { message: "Label is too short (min 2 chars)" })
        .max(20, { message: "Label is too long (max 20 chars" }),
})

export type NoteFormFieldProps = {
    type: string;
    placeholder?: string;
    name: ValidNoteFieldNames;
    defaultValue?: string
    register: UseFormRegister<NoteFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

export type LabelFormFieldProps = {
    type: string;
    placeholder?: string;
    name: ValidLabelFieldNames;
    defaultValue?: string
    register: UseFormRegister<LabelFormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

export type ValidNoteFieldNames =
| "value"

export type ValidLabelFieldNames =
| "name"