export enum TextFieldType {
  Text = 'TEXT',
  Email = 'EMAIL',
  Password = 'PASSWORD',
  Date = 'DATE',
}

export interface FieldValidation {
  validations: (string | Function)[];
  messages: string[];
}
