export interface IQuestionList {
  isNumList?: boolean;
  title: string;
  items: string[];
}

export interface IFaq {
  id: string;
  created_at: string;
  title: string;
  description: string;
  questions: IQuestionList[];
}
