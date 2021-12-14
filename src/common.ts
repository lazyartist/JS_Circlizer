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
}

export class Size extends Vector2D{
    // constructor(x, y) {
    //     this.size = new Vector2D(x, y);
    // }
    //
    // get x() {
    //     return this.size.x;
    // }
    //
    // set x(inValue) {
    //     this.size.x = inValue;
    // }
    //
    // get y() {
    //     return this.size.y;
    // }
    //
    // set y(inValue) {
    //     this.size.y = inValue;
    // }
}

export class Pivot extends Vector2D{
}