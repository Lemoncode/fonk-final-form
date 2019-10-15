import {
  FormValidationExtended,
  ValidationResult,
  ValidationSchema,
  RecordValidationResult,
  FormValidationResult,
  createFormValidation,
} from '@lemoncode/fonk';

/*
React Final form expects a validator to return null or undefined
when  a given validation succeeds, adaptor to fulfill this 
requirement.
 */
export class FinalFormValidation {
  formValidation: FormValidationExtended.FormValidation = null;

  constructor(validationSchema: ValidationSchema) {
    this.formValidation = createFormValidation(validationSchema);
  }

  public validateField(
    fieldId: string,
    value: any,
    values?: any
  ): Promise<ValidationResult> {
    return this.formValidation
      .validateField(fieldId, value, values)
      .then(validationResult =>
        !validationResult.succeeded ? validationResult : null
      );
  }

  public validateRecord(values: any): Promise<RecordValidationResult> {
    return this.formValidation
      .validateRecord(values)
      .then(validationResult =>
        !validationResult.succeeded ? validationResult : null
      );
  }

  public validateForm(values: any): Promise<FormValidationResult> {
    return this.formValidation
      .validateForm(values)
      .then(validationResult =>
        !validationResult.succeeded ? validationResult : null
      );
  }
}

export const createFinalFormValidation = (
  validationSchema: ValidationSchema
): FinalFormValidation => new FinalFormValidation(validationSchema);
