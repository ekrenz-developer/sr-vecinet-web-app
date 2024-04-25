import { LoginMetadataInterface } from "./login-metadata.interface";

export interface LoginInterface<T> {
  content: T;
  metadada: LoginMetadataInterface;
}
