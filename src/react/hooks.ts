import React from "react";
import { HistoryStack } from "../common/HistoryStack";
import { isEqualDOMRect } from "../browser/util";
import { StatefulData } from "./util";

type Action = () => void;
type IComparer<T> = (first: T, second: T) => boolean;

export function useIsPointerDown(target: React.RefObject<HTMLElement>) {
    const isPointerDown: React.MutableRefObject<boolean> = React.useRef<boolean>(false);
    const setPointerTrue: Action = React.useCallback(() => isPointerDown.current = true, [])
    const setPointerFalse: Action = React.useCallback(() => isPointerDown.current = false, [])

    function bindEvents() {
        const element: HTMLElement | null = target.current;
        if (element !== null) {
            element.addEventListener('pointerdown', setPointerTrue);
            element.addEventListener('pointerup', setPointerFalse);
            element.addEventListener('pointerleave', setPointerFalse);
        }
    }

    function unbindEvents() {
        const element: HTMLElement | null = target.current;
        if (element !== null) {
            element.removeEventListener('pointerdown', setPointerTrue);
            element.removeEventListener('pointerup', setPointerFalse);
            element.removeEventListener('pointerleave', setPointerFalse);
        }
    }

    React.useEffect( () => {
        unbindEvents();
        bindEvents();
        return unbindEvents;
    })

    return isPointerDown;
}

export function useIsPointerDownState(target: React.RefObject<HTMLElement>): StatefulData<boolean> {
    const [isPointerDown, setIsPointerDown] = React.useState<boolean>(false);
    const setPointerTrue: Action = React.useCallback(() => setIsPointerDown(true), [])
    const setPointerFalse: Action = React.useCallback(() => setIsPointerDown(false), [])

    function bindEvents() {
        const element: HTMLElement | null = target.current;
        if (element !== null) {
            element.addEventListener('pointerdown', setPointerTrue);
            element.addEventListener('pointerup', setPointerFalse);
            element.addEventListener('pointerleave', setPointerFalse);
        }
    }

    function unbindEvents() {
        const element: HTMLElement | null = target.current;
        if (element !== null) {
            element.removeEventListener('pointerdown', setPointerTrue);
            element.removeEventListener('pointerup', setPointerFalse);
            element.removeEventListener('pointerleave', setPointerFalse);
        }
    }

    React.useEffect( () => {
        unbindEvents();
        bindEvents();
        return unbindEvents;
    })

    return [isPointerDown, setIsPointerDown]
}

export function useHistory<T>(stateData: StatefulData<T>, comparer: IComparer<T>): [Action, Action] {
    const [state, setState] = stateData;
    const history= React.useRef<HistoryStack<T>>(new HistoryStack<T>());

    React.useEffect(() => {
        if (history.current.empty === false) {
          if (comparer(state, history.current.peek()) === false) {
            history.current.pushState(state);
          }
        } else {
            history.current.pushState(state);
        }
      }, [state])
    
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

export function useWebGL2CanvasUpdater(canvasRef: React.RefObject<HTMLCanvasElement>) {
    React.useEffect(() => {
        function updateCanvasSize() {
          const canvas: HTMLCanvasElement | null = canvasRef.current;
          if (canvas !== null) {
            const rect: DOMRect = canvas.getBoundingClientRect();
              canvas.width = rect.width;
              canvas.height = rect.height;
            const gl: WebGL2RenderingContext | null = canvas.getContext('webgl2');
            if (gl !== null) {
                gl.viewport(0, 0, canvas.width, canvas.height);
                }
            }
        }
    
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
      }, [])

}

export function useCanvas2DUpdater(canvasRef: React.RefObject<HTMLCanvasElement>) {
    React.useEffect(() => {
        function updateCanvasSize() {
          const canvas: HTMLCanvasElement | null = canvasRef.current;
          if (canvas !== null) {
            const rect: DOMRect = canvas.getBoundingClientRect();
            const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
            if (context !== null) {
              const data = context.getImageData(0, 0, canvas.width, canvas.height);
              canvas.width = rect.width;
              canvas.height = rect.height;
              context.putImageData(data, 0, 0);
            } else {
              canvas.width = rect.width;
              canvas.height = rect.height;
            }
          }
        }
    
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
      }, [])
}

export function useResizeObserver(toObserve: React.RefObject<HTMLElement>, ...actions: Action[]) {
    const lastBoundingBox = React.useRef<DOMRect>( new DOMRect(0, 0, 0, 0) )
    const onDetect = () => {
        if (toObserve.current !== null && toObserve.current !== undefined) {
            const rect = toObserve.current.getBoundingClientRect()

            if (!isEqualDOMRect(lastBoundingBox.current, rect)) {
                actions.forEach(action => action())
            }
            lastBoundingBox.current = rect
        }
    }

    const observer = React.useRef(new ResizeObserver(onDetect));
    React.useEffect(() => {
        if (toObserve.current !== null && toObserve.current !== undefined) {
            observer.current.disconnect()
            observer.current = new ResizeObserver(onDetect)
            observer.current.observe(toObserve.current)
        }
    })
}

/**
 * A hook to automatically update a canvas's actual size to fit it's holder on window size changes and holder size changes
 * 
 * @param canvasRef Reference to a canvas object which is positioned absolutely and filling its holder completely
 * @param canvasHolderRef Reference to the holder element which holds the absolutely positioned canvas
 * @param actions variable argument of actions (methods which take no parameters and return void) to take on a canvas holder's resize. will generally be an action to re-render the canvas after changing sizes
 */
export function useCanvasHolderUpdater(canvasRef: React.RefObject<HTMLCanvasElement>, canvasHolderRef: React.RefObject<HTMLElement>, ...actions: Action[]): void {

    const updateCanvasSize = React.useCallback( () => {
      const canvas: HTMLCanvasElement | null = canvasRef.current;
      const canvasHolder: HTMLElement | null = canvasHolderRef.current
      if (canvas !== null && canvas !== undefined && canvasHolder !== null && canvasHolder !== undefined) {
        const rect: DOMRect = canvasHolder.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = rect.height;
      }
    }, [])
  
    useResizeObserver(canvasHolderRef, updateCanvasSize, ...actions)
  
    React.useEffect(() => {
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, [])
  }

export function useWindowEvent<T extends keyof WindowEventMap>(event: T, callback: () => void | ((event: WindowEventMap[T]) => void), deps: React.DependencyList) {
    const callbackRef = React.useRef<() => void | ((event: WindowEventMap[T]) => void)>(callback);

    React.useEffect(() => {
        window.removeEventListener(event, callbackRef.current);
        callbackRef.current = callback;
        window.addEventListener(event, callbackRef.current);
        return () => window.removeEventListener(event, callbackRef.current);
    }, deps)
}