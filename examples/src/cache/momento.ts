import { OpenAI } from "langchain/llms/openai";
import { MomentoCache } from "langchain/cache/momento";
import {
  CacheClient,
  Configurations,
  CredentialProvider,
} from "@gomomento/sdk"; // `from "gomomento/sdk-web";` for browser/edge

// See https://github.com/momentohq/client-sdk-javascript for connection options
const client = new CacheClient({
  configuration: Configurations.Laptop.v1(),
  credentialProvider: CredentialProvider.fromEnvironmentVariable({
    environmentVariableName: "MOMENTO_API_KEY",
  }),
  defaultTtlSeconds: 60 * 60 * 24,
});
const cache = await MomentoCache.fromProps({
  client,
  cacheName: "langchain",
});

const model = new OpenAI({ cache });
