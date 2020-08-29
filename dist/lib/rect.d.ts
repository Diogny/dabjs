import { IPoint, IRect } from "./interfaces";
export default class Rect implements IRect {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    get empty(): boolean;
    inside(p: IPoint): boolean;
    intersect(r: Rect): boolean;
    clone(): Rect;
    contains(r: Rect): boolean;
    add(r: Rect): Rect;
    move(x: number, y: number): void;
    /**
     * @description grow/shrink rectangle
     * @param dx left & right growth
     * @param dy top & bottom growth
     */
    grow(dx: number, dy: number): Rect;
    /**
     * @description translates the rectangle
     * @param tx x translation
     * @param ty y translation
     */
    translate(tx: number, ty: number): Rect;
    /**
     * @description scales this rectangle by a factor
     * @param sx x, width scale factor
     * @param sy y, height scale factor
     */
    scale(sx: number, sy: number): Rect;
    equal(r: Rect): boolean;
    static create(rect: IRect, toInt?: boolean): Rect;
    static get empty(): Rect;
    /**
     * @description parse an string into an (x,y) Point
     * @param value string in the for "x, y"
     */
    static parse(value: string): Rect | undefined;
    get str(): string;
}
