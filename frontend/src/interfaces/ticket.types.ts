export interface FormData {
  name: string;
  email: string;
  description: string;
}
export type PartialFormData = Partial<FormData>;
export type LoginInfo = {
  email: string;
  password: string;
};
