"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCanvasHolderUpdater = exports.useResizeObserver = exports.useCanvas2DUpdater = exports.useWebGL2CanvasUpdater = exports.useHistory = exports.useIsPointerDownState = exports.useIsPointerDown = void 0;
const react_1 = __importDefault(require("react"));
const HistoryStack_1 = require("../HistoryStack");
const util_1 = require("../browser/util");
function useIsPointerDown(target) {
    const isPointerDown = react_1.default.useRef(false);
    const setPointerTrue = react_1.default.useCallback(() => isPointerDown.current = true, []);
    const setPointerFalse = react_1.default.useCallback(() => isPointerDown.current = false, []);
    function bindEvents() {
        const element = target.current;
        if (element !== null) {
            element.addEventListener('pointerdown', setPointerTrue);
            element.addEventListener('pointerup', setPointerFalse);
            element.addEventListener('pointerleave', setPointerFalse);
        }
    }
    function unbindEvents() {
        const element = target.current;
        if (element !== null) {
            element.removeEventListener('pointerdown', setPointerTrue);
            element.removeEventListener('pointerup', setPointerFalse);
            element.removeEventListener('pointerleave', setPointerFalse);
        }
    }
    react_1.default.useEffect(() => {
        unbindEvents();
        bindEvents();
        return unbindEvents;
    });
    return isPointerDown;
}
exports.useIsPointerDown = useIsPointerDown;
function useIsPointerDownState(target) {
    const [isPointerDown, setIsPointerDown] = react_1.default.useState(false);
    const setPointerTrue = react_1.default.useCallback(() => setIsPointerDown(true), []);
    const setPointerFalse = react_1.default.useCallback(() => setIsPointerDown(false), []);
    function bindEvents() {
        const element = target.current;
        if (element !== null) {
            element.addEventListener('pointerdown', setPointerTrue);
            element.addEventListener('pointerup', setPointerFalse);
            element.addEventListener('pointerleave', setPointerFalse);
        }
    }
    function unbindEvents() {
        const element = target.current;
        if (element !== null) {
            element.removeEventListener('pointerdown', setPointerTrue);
            element.removeEventListener('pointerup', setPointerFalse);
            element.removeEventListener('pointerleave', setPointerFalse);
        }
    }
    react_1.default.useEffect(() => {
        unbindEvents();
        bindEvents();
        return unbindEvents;
    });
    return [isPointerDown, setIsPointerDown];
}
exports.useIsPointerDownState = useIsPointerDownState;
function useHistory(stateData, comparer) {
    const [state, setState] = stateData;
    const history = react_1.default.useRef(new HistoryStack_1.HistoryStack());
    react_1.default.useEffect(() => {
        if (history.current.empty === false) {
            if (comparer(state, history.current.peek()) === false) {
                history.current.pushState(state);
            }
        }
        else {
            history.current.pushState(state);
        }
    }, [state]);
    function undo() {
        if (history.current.canGoBack()) {
            history.current.back();
            setState(history.current.state);
        }
    }
    function redo() {
        if (history.current.canGoForward()) {
            history.current.forward();
            setState(history.current.state);
        }
    }
    return [undo, redo];
}
exports.useHistory = useHistory;
function useWebGL2CanvasUpdater(canvasRef) {
    react_1.default.useEffect(() => {
        function updateCanvasSize() {
            const canvas = canvasRef.current;
            if (canvas !== null) {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
                const gl = canvas.getContext('webgl2');
                if (gl !== null) {
                    gl.viewport(0, 0, canvas.width, canvas.height);
                }
            }
        }
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);
}
exports.useWebGL2CanvasUpdater = useWebGL2CanvasUpdater;
function useCanvas2DUpdater(canvasRef) {
    react_1.default.useEffect(() => {
        function updateCanvasSize() {
            const canvas = canvasRef.current;
            if (canvas !== null) {
                const rect = canvas.getBoundingClientRect();
                const context = canvas.getContext('2d');
                if (context !== null) {
                    const data = context.getImageData(0, 0, canvas.width, canvas.height);
                    canvas.width = rect.width;
                    canvas.height = rect.height;
                    context.putImageData(data, 0, 0);
                }
                else {
                    canvas.width = rect.width;
                    canvas.height = rect.height;
                }
            }
        }
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);
}
exports.useCanvas2DUpdater = useCanvas2DUpdater;
function useResizeObserver(toObserve, ...actions) {
    const lastBoundingBox = react_1.default.useRef(new DOMRect(0, 0, 0, 0));
    const onDetect = () => {
        if (toObserve.current !== null && toObserve.current !== undefined) {
            const rect = toObserve.current.getBoundingClientRect();
            if (!(0, util_1.isEqualDOMRect)(lastBoundingBox.current, rect)) {
                actions.forEach(action => action());
            }
            lastBoundingBox.current = rect;
        }
    };
    const observer = react_1.default.useRef(new ResizeObserver(onDetect));
    react_1.default.useEffect(() => {
        if (toObserve.current !== null && toObserve.current !== undefined) {
            observer.current.disconnect();
            observer.current = new ResizeObserver(onDetect);
            observer.current.observe(toObserve.current);
        }
    });
}
exports.useResizeObserver = useResizeObserver;
/**
 * A hook to automatically update a canvas's actual size to fit it's holder on window size changes and holder size changes
 *
 * @param canvasRef Reference to a canvas object which is positioned absolutely and filling its holder completely
 * @param canvasHolderRef Reference to the holder element which holds the absolutely positioned canvas
 * @param actions variable argument of actions (methods which take no parameters and return void) to take on a canvas holder's resize. will generally be an action to re-render the canvas after changing sizes
 */
function useCanvasHolderUpdater(canvasRef, canvasHolderRef, ...actions) {
    const updateCanvasSize = react_1.default.useCallback(() => {
        const canvas = canvasRef.current;
        const canvasHolder = canvasHolderRef.current;
        if (canvas !== null && canvas !== undefined && canvasHolder !== null && canvasHolder !== undefined) {
            const rect = canvasHolder.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
        }
    }, []);
    useResizeObserver(canvasHolderRef, updateCanvasSize, ...actions);
    react_1.default.useEffect(() => {
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);
}
exports.useCanvasHolderUpdater = useCanvasHolderUpdater;
