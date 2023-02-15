import vm from 'node:vm';
import path from 'node:path';
import fs from 'node:fs/promises';
import { WriteStream } from 'node:fs';

// https://common-min-api.proposal.wintercg.org/
function apis() {
  return {
    AbortController,
    AbortSignal,
    atob,
    btoa,
    // ByteLengthQueuingStrategy,
    clearInterval,
    clearTimeout,
    // CompressionSteam,
    console,
    // CountQueueingStrategy,
    // crypto,
    // Crypto,
    // CryptoKey,
    // DecompressionStream,
    DOMException,
    Event,
    EventTarget,
    fetch,
    queueMicrotask,
    // ReadableByteStreamController,
    // ReadableStream,
    // ReadableStreamBYOBReader,
    // ReadableStreamBYOBRequest,
    // ReadableStreamDefaultController,
    // ReadableStreamDefaultReader,
    setInterval,
    setTimeout,
    structuredClone,
    // SubtleCrypto,
    TextDecoder,
    // TextDecoderStream,
    TextEncoder,
    // TextEncoderStream,
    // TransformStream,
    // TransformStreamDefaultController,
    URL,
    URLSearchParams,
    // WritableStreamDefaultController,
    WriteStream,
  };
}

function loadCode(appId, serviceName) {
  const jsFile = path.join(__dirname, '../app', appId, serviceName + '.js');
  return fs.readFile(jsFile, 'utf-8');
}

class ServiceEngine {
  constructor() {
    this._cache = {};
  }

  async init(appId, serviceName) {
    const cacheKey = `${appId}/${serviceName}`;
    let cached = this._cache[cacheKey];
    if (!cached) {
      const code = await loadCode(appId, serviceName);
      const script = new vm.Script(code);
      this._cache[cacheKey] = script;
      cached = this._cache[cacheKey];
    }

    return ctx => {
      const ctx_ = vm.createContext({ ...apis(), ...ctx });
      cached.runInNewContext(ctx_);
      cached = null;
    };
  }
}

const SERVICE_ENGINE = new ServiceEngine();

export async function invokeService(appId, serviceName, event) {
  const service = await SERVICE_ENGINE.init(appId, serviceName);
  service({ event });
}
