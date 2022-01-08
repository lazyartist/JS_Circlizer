export class Vector2D {
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
    constructor(x1, y1, w, h) {
        this.setXY(x1, y1, w, h);
    }
    get x1() {
        return this._x1;
    }
    get y1() {
        return this._y1;
    }
    get w() {
        return this._w;
    }
    get h() {
        return this._h;
    }
    get x2() {
        return this._x2;
    }
    get y2() {
        return this._y2;
    }
    setXY(x1, y1, w, h) {
        this._x1 = x1;
        this._y1 = y1;
        this._w = w;
        this._h = h;
        this._x2 = x1 + w;
        this._y2 = y1 + h;
    }
    getVector2D() {
        return new Vector2D(this._w, this._h);
    }
}
//# sourceMappingURL=common.js.map