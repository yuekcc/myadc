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

function initVm(code) {
  return event => {
    const ctx = vm.createContext({ event, ...apis() });
    const script = new vm.Script(code);
    return script.runInNewContext(ctx);
  };
}

function loadCode(appId, serviceName) {
  const jsFile = path.join(__dirname, '../app', appId, serviceName + '.js');
  return fs.readFile(jsFile, 'utf-8');
}

export async function invokeService(appId, serviceName, event) {
  const code = await loadCode(appId, serviceName);

  const run = initVm(code);
  run(event);
}
