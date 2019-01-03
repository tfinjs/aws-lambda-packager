/* eslint-env jest */
import { resolve, relative } from 'path';
import transpileAndGetDependencies from '../transpileAndGetDependencies';

test('transpileAndGetDependencies', async () => {
  const entryFilePath = resolve(__dirname, 'service.js');
  const { dependencies } = await transpileAndGetDependencies(entryFilePath);
  const projectRootFolderPath = resolve(__dirname, '../../');
  const normalizedDeps = dependencies.map((ob) => ({
    ...ob,
    ...[
      'dependencyFolderPath',
      'yarnLockFilePath',
      'packageJsonFilePath',
      'projectFolder',
    ].reduce(
      (c, key) => ({
        ...c,
        [key]: relative(projectRootFolderPath, ob[key]),
      }),
      {},
    ),
  }));
  console.log(JSON.stringify(normalizedDeps, null, 2));
});
