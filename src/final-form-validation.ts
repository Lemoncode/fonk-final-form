import {
  FormValidation,
  ValidationResult,
  ValidationSchema,
  createFormValidation,
  FormValidationResult,
} from '@lemoncode/fonk';

import { set } from './helpers';
/*
  React Final form expects a validator to return null or undefined
  when  a given validation succeeds, adaptor to fulfill this
  requirement.
   */
export class FinalFormValidation {
  formValidation: FormValidation = null;

  constructor(validationSchema: ValidationSchema) {
    this.formValidation = createFormValidation(validationSchema);
  }

  private mapErrorsToFinalFormErrorMessageStructure = (errors: {
    [fieldId: string]: ValidationResult;
  }): Record<string, string> => {
    const finalFormErrors = {};

    for (const key of Object.keys(errors)) {
      const errorMessage =
        errors[key] && !errors[key].succeeded ? errors[key].message : '';
      set(finalFormErrors, key, errorMessage);
    }

    return finalFormErrors;
  };

  public validateField = (
    fieldId: string,
    value: any,
    values?: any
  ): Promise<string> => {
    return this.formValidation
      .validateField(fieldId, value, values)
      .then(validationResult =>
        !validationResult.succeeded ? validationResult.message : null
      );
  };

  public validateRecord = (
    values: any
  ): Promise<{ recordErrors: Record<string, string> }> => {
    return this.formValidation.validateRecord(values).then(validationResult =>
      !validationResult.succeeded
        ? {
            recordErrors: {
              ...this.mapErrorsToFinalFormErrorMessageStructure(
                validationResult.recordErrors
              ),
            },
          }
        : null
    );
  };

  private buildErrors = (validationResult: FormValidationResult) => {
    let errors = {};

    errors = {
      ...this.mapErrorsToFinalFormErrorMessageStructure(
        validationResult.fieldErrors
      ),
    };

    errors = {
      ...errors,
      recordErrors: this.mapErrorsToFinalFormErrorMessageStructure(
        validationResult.recordErrors
      ),
    };

    return errors;
  };

  public validateForm = (
    values: any
  ): Promise<
    Record<string, string> | { recordErrors: Record<string, string> }
  > => {
    return this.formValidation
      .validateForm(values)
      .then(validationResult =>
        !validationResult.succeeded ? this.buildErrors(validationResult) : null
      );
  };

  public updateValidationSchema = (
    validationSchema: ValidationSchema
  ): void => {
    this.formValidation.updateValidationSchema(validationSchema);
  };
}

export const createFinalFormValidation = (
  validationSchema: ValidationSchema
): FinalFormValidation => new FinalFormValidation(validationSchema);
