/* eslint-env jest */
import packager from '..';
import { resolve } from 'path';

test('Packager', async () => {
  const entryFilePath = resolve(__dirname, 'service.js');
  const dist = resolve(__dirname, 'dist');
  await packager(entryFilePath, dist);
});
