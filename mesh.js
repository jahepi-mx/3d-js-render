class Mesh {
    
    constructor() {
        this.translation = new Vector(0, 0, 0);
        this.triangles = [];
    }
    
    addTriangle(triangle) {
        this.triangles.push(triangle);
    }
    
    transformLocal(matrix) {
        for (let triangle of this.triangles) {
            triangle.transformLocal(matrix);
        }
    }
    
    render(context) {
        for (let triangle of this.triangles) {
            triangle.translate(this.translation);
            triangle.renderWireframe(context);
        }
    }
}