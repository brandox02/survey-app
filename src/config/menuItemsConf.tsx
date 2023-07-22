'use client';

import { FcSurvey } from 'react-icons/fc'
import { MdQuestionAnswer } from 'react-icons/md'
export type MenuItem = Array<{ label: string, to: string, icon: any }>;

export const menuItems: MenuItem = [
   { label: 'Encuestas', icon: FcSurvey, to: '/backoffice/surveys' },
   { label: 'Respuestas', icon: MdQuestionAnswer, to: '/backoffice/answers' },
];
