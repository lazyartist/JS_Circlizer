export class ColorSet {
}
// static Pivot: string = "#ffffff";
ColorSet.Position = "#ffffff";
ColorSet.Possess = "#ff0000";
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
    // constructor() {
    //     this._m00 = m00;
    //     this._m01 = m01;
    //     this._m10 = m10;
    //     this._m11 = m11;
    // }
    constructor(m00 = 0, m01 = 0, m10 = 0, m11 = 0) {
        this._m00 = m00;
        this._m01 = m01;
        this._m10 = m10;
        this._m11 = m11;
    }
    static rotation_by_radian(radian) {
        let r = new Matrix2();
        r.setRotation(radian);
        return r;
    }
    static rotation_by_degree(degree) {
        return Matrix2.rotation_by_radian(degree * Math.PI / 180);
    }
    setRotation(radian) {
        this._m00 = Math.cos(radian);
        this._m01 = -Math.sin(radian);
        this._m10 = Math.sin(radian);
        this._m11 = Math.cos(radian);
    }
    multiply_with_vector2(vector2d) {
        return new Vector2(this._m00 * vector2d.x + this._m01 * vector2d.y, this._m10 * vector2d.x + this._m11 * vector2d.y);
        // return new Matrix2(this._m00 * vector2d.x, this._m01 * vector2d.y, this._m10 * vector2d.x, this._m11 * vector2d.y);
    }
    toString() {
        return `${this._m00}, ${this._m01}, ${this._m10}, ${this._m11}`;
    }
}
export class Transform2 {
    constructor(x, y, rotation, scale) {
        this.rotationMatrix = new Matrix2;
        this.position = new Vector2(0, 0);
        this.rotation = 0;
        this.scale = 0;
        if (x && y) {
            this.position.setXY(x, y);
        }
        if (rotation) {
            this.rotation = rotation;
        }
        if (scale) {
            this.scale = scale;
        }
    }
    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(value) {
        this._rotation = value;
        this.rotationMatrix.setRotation(value);
    }
    get scale() {
        return this._scale;
    }
    set scale(value) {
        this._scale = value;
    }
    get rotationMatrix() {
        return this._rotationMatrix;
    }
    set rotationMatrix(value) {
        this._rotationMatrix = value;
    }
}
//# sourceMappingURL=common.js.map