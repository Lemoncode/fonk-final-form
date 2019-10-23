import {
  FormValidationExtended,
  ValidationResult,
  ValidationSchema,
  RecordValidationResult,
  createFormValidation,
} from '@lemoncode/fonk';

/*
  React Final form expects a validator to return null or undefined
  when  a given validation succeeds, adaptor to fulfill this
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
  ): Promise<string> {
    return this.formValidation
      .validateField(fieldId, value, values)
      .then(validationResult =>
        !validationResult.succeeded ? validationResult.message : null
      );
  }

  // TODO: Discuss, should we move this to plain null or simple array
  // of messages just to be consistent with the rest of
  // methods?
  public validateRecord(values: any): Promise<RecordValidationResult> {
    return this.formValidation
      .validateRecord(values)
      .then(validationResult =>
        !validationResult.succeeded ? validationResult : null
      );
  }

  private fieldErrorsToFlatString(fieldErrors: {
    [fieldId: string]: ValidationResult;
  }): Record<string, string> {
    return Object.keys(fieldErrors).reduce(
      (dest, key) => ({
        ...dest,
        [key]: fieldErrors[key] ? fieldErrors[key].message : '',
      }),
      {}
    );
  }

  public validateForm(values: any): Promise<any> {
    return this.formValidation.validateForm(values).then(validationResult =>
      !validationResult.succeeded
        ? {
            ...this.fieldErrorsToFlatString(validationResult.fieldErrors),
            recordErrors: validationResult.recordErrors,
          }
        : null
    );
  }
}

export const createFinalFormValidation = (
  validationSchema: ValidationSchema
): FinalFormValidation => new FinalFormValidation(validationSchema);
