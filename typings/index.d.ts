import { ValidationSchema } from '@lemoncode/fonk';

/**
 * Main function to create an instance of FinalFormValidation. We could use `validateField`, `validateRecord` and/or `validateForm` to fire validations.
 *
 * **Arguments**
 * - ValidationSchema
 *
 * **Returns**
 *  - FinalFormValidation instance.
 */
export function createFinalFormValidation(
  validationSchema: ValidationSchema
): FinalFormValidation;

interface FinalFormValidation {
  validateField: (fieldId: string, value: any, values?: any) => Promise<string>;

  validateRecord: (values: any) => Promise<Record<string, string>>;

  validateForm: (
    values: any
  ) => Promise<
    Record<string, string> | { recordErrors: Record<string, string> }
  >;
}
