import { z } from "zod";

export const GeoSchema = z.object({
  lat: z.string(),
  lng: z.string(),
});

export type GeoType = z.infer<typeof GeoSchema>;

export const AddressSchema = z.object({
  street: z.string(),
  suite: z.string(),
  city: z.string(),
  zipcode: z.string(),
  geo: GeoSchema,
});

export type AddressType = z.infer<typeof AddressSchema>;

export const CompanySchema = z.object({
  name: z.string(),
  catchPhrase: z.string(),
  bs: z.string(),
});

export type CompanyType = z.infer<typeof CompanySchema>;

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.email(),
  address: AddressSchema,
  phone: z.string(),
  website: z.string(),
  company: CompanySchema,
});

export type UserType = z.infer<typeof UserSchema>;

export const UserResponseSchema = z.array(UserSchema);

export type UserResponseType = z.infer<typeof UserResponseSchema>;

export const UsersFilterSchema = z.object({
  name_like: z.string().nullish(),
  "company.name": z.string().nullish(),
  "address.city": z.string().nullish(),
});

export type UsersFilterType = z.infer<typeof UsersFilterSchema>;
