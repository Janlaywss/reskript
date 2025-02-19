import fs from 'node:fs';
import path from 'node:path';
import semver from 'semver';

const RESTRICTED_DEPENDENCIES = [
    ['imagemin', '7.x'],
    ['img-loader', '3.x'],
    ['log-symbols', '4.x'],
    ['ora', '5.x'],
    ['globby', '11.x'],
    ['unified', '9.x'],
    ['remark-gfm', '1.x'],
    ['remark-parse', '9.x'],
    ['remark-stringify', '9.x'],
    ['find-up', '5.x'],
    ['pad-stream', '2.x'],
    ['@typescript-eslint/eslint-plugin', '4.x'],
    ['@typescript-eslint/parser', '4.x'],
    ['eslint', '7.x'],
    ['internal-ip', '6.x'],
    ['matcher', '4.x'],
    ['pkg-dir', '5.x'],
];

const checkDependencyFor = restrictedVersionRange => definedVersionRange => {
    if (definedVersionRange) {
        const minVersion = semver.minVersion(definedVersionRange);
        return semver.satisfies(minVersion, restrictedVersionRange);
    }

    return true;
};

const packages = fs.readdirSync('packages');
for (const packageName of packages) {
    const packageContent = fs.readFileSync(path.join('packages', packageName, 'package.json'), 'utf-8');
    const {dependencies = {}, devDependencies = {}} = JSON.parse(packageContent);
    for (const [name, range] of RESTRICTED_DEPENDENCIES) {
        const check = checkDependencyFor(range);
        if (!check(dependencies[name]) || !check(devDependencies[name])) {
            console.error(`Dependency ${name} (installed in ${packageName} does not satisfy restriction ${range})`);
            process.exit(1);
        }
    }
}
