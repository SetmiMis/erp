// src/common/transformers/empty-to-undefined.transformer.ts
import { Transform } from 'class-transformer';

/**
 * 🛠️ Bug fix: class-validator's @IsOptional() only skips validation for
 * `null`/`undefined` — NOT for an empty string. Frontend forms routinely
 * submit "" for blank optional fields (e.g. phone, pincode, gst_number),
 * so a field like `@IsOptional() @IsPhoneNumber('IN') phone?: string`
 * still runs IsPhoneNumber against "" and rejects the request with
 * "phone must be a valid phone number" even though the user left it blank.
 *
 * Apply this decorator (before the @Is.../@Matches format validators) on
 * any optional field validated by a strict-format validator, to normalize
 * "" to `undefined` so @IsOptional() actually takes effect.
 */
export const EmptyToUndefined = () =>
  Transform(({ value }) => (value === '' ? undefined : value)); // eslint-disable-line @typescript-eslint/no-unsafe-return
