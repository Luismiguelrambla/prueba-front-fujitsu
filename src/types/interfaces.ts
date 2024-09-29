export interface IDocument {
  id: string;
  name: string;
  status: string;
  tags: string[];
  date: string;
  validations: number;
  pendingValidation: boolean;
  favorite: boolean;
}

export interface ILanguageOption {
  name: string;
  code: string;
};