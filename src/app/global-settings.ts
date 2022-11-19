import { environment } from '../environments/environment';

export class GlobalSettings {
  production: boolean;
  version: string;
  apiKey: string;
  apiVersion: string;
  domain: string;

  constructor(production = false, version = '', apiKey = '', apiVersion = '', domain = '') {
    this.production = production;
    this.version = version;
    this.apiKey = apiKey;
    this.apiVersion = apiVersion;
    this.domain = domain;
  }
}

export class GlobalSettingsBuilder {
  production!: boolean;
  version!: string;
  apiKey!: string;
  apiVersion!: string;
  domain!: string;

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

  build() {
    return new GlobalSettings(this.production, this.version, this.apiKey, this.apiVersion, this.domain);
  }
}

export const GLOBAL_SETTINGS = new GlobalSettingsBuilder()
  .setProduction(environment.production)
  .setVersion(environment.version)
  .setApiKey(environment.apiKey)
  .setApiVersion(environment.apiVersion)
  .setDomain(environment.domain)
  .build()
