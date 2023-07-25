

export type QuestionType = 'text' | 'comment' | 'radiogroup' | 'checkbox' | 'boolean' | 'imagepicker';

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

export interface CheckboxGroupQuestion extends RadioGroupQuestion {}

export interface ImageSelectQuestion extends RadioGroupQuestion {
   multiSelect: boolean;
   choices: Array<{ text: string, value: string, imageLink?: string }>
   imageWidth: number;
   showLabel: true,
}
export interface BooleanQuestion extends BaseQuestion {
   labelTrue: string;
   labelFalse: string;
}

export type QuestionElement 
   = TextFieldQuestion | RadioGroupQuestion | CheckboxGroupQuestion | BooleanQuestion | ImageSelectQuestion;

export type NotRequiredQuestionElement = {
   name?: string;
   title?: string;
   type?: string;
   inputType?: 'text' | 'number'
   choices?: Array<{ text: string, value: string }>;
   isRequired?: boolean;
   labelTrue?: string;
   labelFalse?: string;
   imageWidth?: number;
   imageHeight?: number;
   multiSelect?: boolean
}

export type ItemWrapper = {
   onClick: () => void;
   children: JSX.Element;
   isSelected: boolean;
}