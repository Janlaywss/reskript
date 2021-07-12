/* eslint-disable */
import {render} from 'react-dom';
import Playground from '%PLAYGROUND_PATH%';
import Target from '%COMPONENT_MODULE_PATH%';
%EXTRA_IMPORTS%
%CONFIGURATION_BLOCK%

render(
    <Playground
        componentName="%COMPONENT_TYPE_NAME%"
        componentType={Target}
        injects={injects}
        renderPreview={renderPreview}
    />,
    document.body.appendChild(document.createElement('div'))
);
