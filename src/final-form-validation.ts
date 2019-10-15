import {
  FormValidationExtended,
  ValidationResult,
  ValidationSchema,
  RecordValidationResult,
  FormValidationResult,
  createFormValidation,
} from '@lemoncode/fonk';

const { FormValidation } = FormValidationExtended;

export class FinalFormValidation {
  formValidation: FormValidation = null;

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
    // TODO handle then here, if succeeded just return a undefined or null
    return this.formValidation.validateForm(
      values,
      formValidation.fieldSchema,
      formValidation.recordSchema
    );
  }
}

export const createFinalFormValidation = (
  validationSchema: ValidationSchema
): FinalFormValidation => new FinalFormValidation(validationSchema);
