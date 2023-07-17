

export type QuestionType = 'text' | 'comment' | 'radiogroup' | 'checkbox' | 'boolean'

interface BaseQuestion {
   name: string;
   title: string;
   type: QuestionType,
   isRequired: boolean;
}

export interface TextFieldQuestion extends BaseQuestion {

   inputType: 'text' | 'number';
}

export interface RadioGroupQuestion extends BaseQuestion {
   choices: Array<{ text: string, value: string }>
}

export interface CheckboxGroupQuestion extends BaseQuestion {

   choices: Array<{ text: string, value: string }>
}
export interface BooleanQuestion extends BaseQuestion {
   labelTrue: string;
   labelFalse: string;
}

export type QuestionElement = TextFieldQuestion | RadioGroupQuestion | CheckboxGroupQuestion | BooleanQuestion;

export type NotRequiredQuestionElement = {
   name?: string;
   title?: string;
   type?: string;
   inputType?: 'text' | 'number'
   choices?: Array<{ text: string, value: string }>;
   isRequired?: boolean;
   labelTrue?: string;
   labelFalse?: string;
}

export type ItemWrapper = {
   onClick: () => void;
   children: JSX.Element;
   isSelected: boolean;
}