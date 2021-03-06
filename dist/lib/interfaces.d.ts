import Point from "./point";
import Size from "./size";
import Rect from "./rect";
export declare type IEqual = (p: Point | Size | Rect) => boolean;
export interface IPoint {
    x: number;
    y: number;
}
export interface IPoint3D extends IPoint {
    z: number;
}
export interface ISize {
    width: number;
    height: number;
}
export interface IRect extends IPoint, ISize {
}
