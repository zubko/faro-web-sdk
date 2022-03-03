import { registerOnerror } from './registerOnerror';
import { registerOnunhandledrejection } from './registerOnunhandledrejection';
var errorsInstrumentation = function () {
    registerOnerror();
    registerOnunhandledrejection();
};
export default errorsInstrumentation;
//# sourceMappingURL=index.js.map