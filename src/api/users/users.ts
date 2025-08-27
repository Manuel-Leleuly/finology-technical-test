import { FetchLib } from "@/lib/fetchLib";
import type { AxiosInstance } from "axios";
import {
  UserResponseSchema,
  UserSchema,
  type UserResponseType,
  type UsersFilterType,
  type UserType,
} from "./model/users";

export class UsersApi {
  static getAllUsers = async (
    network: AxiosInstance,
    params: UsersFilterType
  ) => {
    return await FetchLib.validateResponse<UserResponseType>(
      () => network.get("/users", { params }),
      UserResponseSchema
    );
  };

  static getUserById = async (network: AxiosInstance, userId: string) => {
    return await FetchLib.validateResponse<UserType>(
      () => network.get(`/users/${userId}`),
      UserSchema
    );
  };
}
