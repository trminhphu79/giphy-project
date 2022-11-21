import { environment } from '../environments/environment';

export interface IFirebaseConfig {
  projectId: string,
  appId: string,
  storageBucket: string,
  locationId: string,
  apiKey: string,
  authDomain: string,
  measurementId: string,
  messagingSenderId: string
}

export const FirebaseInit = {
  projectId: "",
  appId: "",
  storageBucket: "",
  locationId: "",
  apiKey: "",
  authDomain: "",
  measurementId: "",
  messagingSenderId: ""
}
export class GlobalSettings {
  production: boolean;
  version: string;
  apiKey: string;
  apiVersion: string;
  domain: string;
  firebaseConfig: IFirebaseConfig;
  
  constructor(production = false, version = '', apiKey = '', apiVersion = '', domain = '', firebaseConfig = FirebaseInit) {
    this.production = production;
    this.version = version;
    this.apiKey = apiKey;
    this.apiVersion = apiVersion;
    this.domain = domain;
    this.firebaseConfig = firebaseConfig;
  }
}

export class GlobalSettingsBuilder {
  production!: boolean;
  version!: string;
  apiKey!: string;
  apiVersion!: string;
  domain!: string;
  firebaseConfig!: IFirebaseConfig
  setProduction(value = false) {
    this.production = value;
    return this;
  }

  setVersion(value = '') {
    this.version = value;
    return this;
  }

  setApiKey(value = '') {
    this.apiKey = value;
    return this;
  }

  setApiVersion(value = '') {
    this.apiVersion = value;
    return this
  }

  setDomain(value = '') {
    this.domain = value;
    return this;
  }

  setFirebaseConfig(value = FirebaseInit) {
    this.firebaseConfig = value
    return this
  }

  build() {
    return new GlobalSettings(this.production, this.version, this.apiKey, this.apiVersion, this.domain, this.firebaseConfig);
  }
}

export const GLOBAL_SETTINGS = new GlobalSettingsBuilder()
  .setProduction(environment.production)
  .setVersion(environment.version)
  .setApiKey(environment.apiKey)
  .setApiVersion(environment.apiVersion)
  .setDomain(environment.domain)
  .setFirebaseConfig(environment.firebase)
  .build()

