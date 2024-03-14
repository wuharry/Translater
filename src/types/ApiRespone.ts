interface TranslateResponse {
  amazon: AmazonTranslation;
  google: GoogleTranslation;
  ibm: IBMTranslation;
  microsoft: MicrosoftTranslation;
}

interface AmazonTranslation {
  status: string;
  text: string;
}

interface GoogleTranslation {
  status: string;
  text: string;
}

interface IBMTranslation {
  status: string;
  text: string;
}

interface MicrosoftTranslation {
  status: string;
  text: string;
}

export type { TranslateResponse };
