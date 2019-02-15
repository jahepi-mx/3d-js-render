class Triangle {
    
    constructor() {
        this.v1 = new Vector(0, 0, 0);
        this.v2 = new Vector(0, 0, 0);
        this.v3 = new Vector(0, 0, 0);
        
        this.vt1 = new Vector(0, 0, 0);
        this.vt2 = new Vector(0, 0, 0);
        this.vt3 = new Vector(0, 0, 0);
    }
    
    transform(matrix) {
        var matrix4x4 = Matrix4x4.getInstance();
        this. vt1 = matrix4x4.transform(matrix, this.v1);
        this. vt2 = matrix4x4.transform(matrix, this.v2);
        this. vt3 = matrix4x4.transform(matrix, this.v3);
    }
}