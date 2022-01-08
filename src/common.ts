export class Vector2 {
    _x;
    _y;

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(inValue) {
        this._x = inValue;
    }

    get y() {
        return this._y;
    }

    set y(inValue) {
        this._y = inValue;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Size extends Vector2 {
}

export class Pivot extends Vector2 {
}

export class Rect {
    private _x1: number;
    private _y1: number;
    private _w: number;
    private _h: number;
    private _x2: number;
    private _y2: number;

    public get x1(): number {
        return this._x1;
    }

    public get y1(): number {
        return this._y1;
    }

    public get w(): number {
        return this._w;
    }

    public get h(): number {
        return this._h;
    }

    public get x2(): number {
        return this._x2;
    }

    public get y2(): number {
        return this._y2;
    }

    constructor(x1: number, y1: number, w: number, h: number) {
        this.setXY(x1, y1, w, h);
    }

    setXY(x1: number, y1: number, w: number, h: number) : void {
        this._x1 = x1;
        this._y1 = y1;
        this._w = w;
        this._h = h;
        this._x2 = x1 + w;
        this._y2 = y1 + h;
    }

    getVector2D(){
        return new Vector2(this._w, this._h);
    }
}

export class Matrix2 {
    _m00 : number;
    _m01 : number;
    _m10 : number;
    _m11 : number;

    constructor(m00 : number, m01 : number, m10 : number, m11 : number) {
        this._m00 = m00;
        this._m01 = m01;
        this._m10 = m10;
        this._m11 = m11;
    }

    static createRotation_by_radian(radian : number)
    {
        return new Matrix2(Math.cos(radian), -Math.sin(radian), Math.sin(radian), Math.cos(radian));
    }

    static createRotation_by_degree(degree : number) : Matrix2
    {
        return Matrix2.createRotation_by_radian(degree * Math.PI / 180);
    }

    Multiply_With_Vector2D(vector2d : Vector2) : Vector2
    {
        return new Vector2(this._m00 * vector2d.x + this._m01 * vector2d.y, this._m10 * vector2d.x + this._m11 * vector2d.y);
        // return new Matrix2(this._m00 * vector2d.x, this._m01 * vector2d.y, this._m10 * vector2d.x, this._m11 * vector2d.y);
    }

    public toString() : string
    {
        return `${this._m00}, ${this._m01}, ${this._m10}, ${this._m11}`;
    }
}