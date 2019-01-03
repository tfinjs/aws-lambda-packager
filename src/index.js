import AdmZip from 'adm-zip';
import fs from 'fs';
import transpileAndGetDependencies from './transpileAndGetDependencies';

const packager = async (entryFilePath, zipFilePath) => {
  const { data, dependencies } = await transpileAndGetDependencies(
    entryFilePath,
  );

  const zipFile = new AdmZip();
  // add file directly
  zipFile.addFile('service.js', data);
  const packagedPackageJson = {
    name: 'tfinjs-aws-lambda-package',
    version: '1.0.0',
    description: 'Packaged using the tfinjs/aws-lambda-packager',
    private: true,
    scripts: {},
    dependencies: {},
  };

  dependencies.forEach(
    ({ dependencyFolderPath, dependencyName, packageJsonFilePath }) => {
      packagedPackageJson.dependencies[dependencyName] = JSON.parse(
        fs.readFileSync(packageJsonFilePath, 'utf8'),
      ).version;
      zipFile.addLocalFolder(
        dependencyFolderPath,
        `node_modules/${dependencyName}`,
      );
    },
  );
  zipFile.addFile('package.json', JSON.stringify(packagedPackageJson, null, 2));
  zipFile.writeZip(zipFilePath);
  return { data, dependencies };
};
export default packager;
