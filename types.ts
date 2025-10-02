import React from 'react';

export enum Language {
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  DE = 'de',
  IT = 'it',
  PT = 'pt',
  RU = 'ru',
  ZH_CN = 'zh-cn', // Simplified
  ZH_TW = 'zh-tw', // Traditional
  JA = 'ja',
  KO = 'ko',
  AR = 'ar',
  TR = 'tr',
  HI = 'hi',
  UR = 'ur',
  BN = 'bn',
  ID = 'id',
  MS = 'ms',
  NL = 'nl',
  PL = 'pl',
}

export interface Calculator {
  id: string;
  titleKey: string;
  descriptionKey: string;
  path: string;
  icon: React.ReactElement;
}

export interface Translations {
  [key: string]: {
    [key: string]: string | { [key: string]: string };
  };
}

export interface AmortizationData {
    month: number;
    principal: string;
    interest: string;
    totalPayment: string;
    remainingBalance: string;
}
