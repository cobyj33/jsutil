import React from "react";
import { StatefulData } from "./util";
type Action = () => void;
type IComparer<T> = (first: T, second: T) => boolean;
export declare function useIsPointerDown(target: React.RefObject<HTMLElement>): React.MutableRefObject<boolean>;
export declare function useIsPointerDownState(target: React.RefObject<HTMLElement>): StatefulData<boolean>;
export declare function useHistory<T>(stateData: StatefulData<T>, comparer: IComparer<T>): [Action, Action];
export declare function useWebGL2CanvasUpdater(canvasRef: React.RefObject<HTMLCanvasElement>): void;
export declare function useCanvas2DUpdater(canvasRef: React.RefObject<HTMLCanvasElement>): void;
export declare function useResizeObserver(toObserve: React.RefObject<HTMLElement>, ...actions: Action[]): void;
/**
 * A hook to automatically update a canvas's actual size to fit it's holder on window size changes and holder size changes
 *
 * @param canvasRef Reference to a canvas object which is positioned absolutely and filling its holder completely
 * @param canvasHolderRef Reference to the holder element which holds the absolutely positioned canvas
 * @param actions variable argument of actions (methods which take no parameters and return void) to take on a canvas holder's resize. will generally be an action to re-render the canvas after changing sizes
 */
export declare function useCanvasHolderUpdater(canvasRef: React.RefObject<HTMLCanvasElement>, canvasHolderRef: React.RefObject<HTMLElement>, ...actions: Action[]): void;
export declare function useWindowEvent<T extends keyof WindowEventMap>(event: T, callback: () => void | ((event: WindowEventMap[T]) => void), deps: React.DependencyList): void;
export {};
//# sourceMappingURL=hooks.d.ts.map