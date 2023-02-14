import vm from 'node:vm';
import path from 'node:path';
import fs from 'node:fs/promises';

function initVm(code) {
  return event => {
    const ctx = vm.createContext({ event, console });
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
