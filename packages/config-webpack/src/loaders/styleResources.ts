import path from 'path';
import {sync as resolve} from 'resolve';
import {compact} from 'lodash';
import unixify from 'unixify';
import {LoaderFactory} from '../interface';

const factory: LoaderFactory = ({cwd, srcDirectory, projectSettings}) => {
    const {build: {style: {resources}}} = projectSettings;
    const patterns = [
        ...resources,
        unixify(path.resolve(cwd, srcDirectory, 'styles/*.var.less')),
    ];

    return {
        loader: resolve('style-resources-loader'),
        options: {
            patterns: compact(patterns),
            injector: 'append',
        },
    };
};

export default factory;
