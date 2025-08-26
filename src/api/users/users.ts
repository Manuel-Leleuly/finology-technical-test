import { FetchLib } from "@/lib/fetchLib";
import type { AxiosInstance } from "axios";
import { UserResponseSchema, type UserResponseType } from "./model/users";

export class UsersApi {
  static getAllUsers = async (network: AxiosInstance) => {
    return await FetchLib.validateResponse<UserResponseType>(
      () => network.get("/users"),
      UserResponseSchema
    );
  };
}
