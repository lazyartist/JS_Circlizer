export class Vector2 {
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
        return new Vector2(this._w, this._h);
    }
}
export class Matrix2 {
    constructor(m00, m01, m10, m11) {
        this._m00 = m00;
        this._m01 = m01;
        this._m10 = m10;
        this._m11 = m11;
    }
    static createRotation_by_radian(radian) {
        return new Matrix2(Math.cos(radian), -Math.sin(radian), Math.sin(radian), Math.cos(radian));
    }
    static createRotation_by_degree(degree) {
        return Matrix2.createRotation_by_radian(degree * Math.PI / 180);
    }
    Multiply_With_Vector2D(vector2d) {
        return new Vector2(this._m00 * vector2d.x + this._m01 * vector2d.y, this._m10 * vector2d.x + this._m11 * vector2d.y);
        // return new Matrix2(this._m00 * vector2d.x, this._m01 * vector2d.y, this._m10 * vector2d.x, this._m11 * vector2d.y);
    }
    toString() {
        return `${this._m00}, ${this._m01}, ${this._m10}, ${this._m11}`;
    }
}
//# sourceMappingURL=common.js.map