import { Environment } from "./environment.interface";
import packageInfo from "@package"

export const environment: Environment = {
  appAlias: packageInfo.name,
  apiUrl: 'http://localhost:8080'
};
