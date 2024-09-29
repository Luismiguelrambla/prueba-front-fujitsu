export interface ITags {
  bag: number;
  box: number;
}
export interface IDocument {
  id: string;
  name: string;
  description: string;
  template: string;
  date: string;
  status: string;
  validation: number;
  pendingValidation: boolean;
  favorite: boolean;
  tags: ITags;
  constraints: any[];
  sourceEvaluation: string;
}
export interface ILanguageOption {
  name: string;
  code: string;
};