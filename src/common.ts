export class Vector2D {
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

export class Size extends Vector2D {
}

export class Pivot extends Vector2D {
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
        return new Vector2D(this._w, this._h);
    }
}