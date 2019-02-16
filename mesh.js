class Mesh {
    
    constructor() {
        this.translation = new Vector(0, 0, 0);
        this.triangles = [];
    }
    
    addTriangle(triangle) {
        this.triangles.push(triangle);
    }
    
    transformViewMatrix(localTransMatrix, cameraViewDir, cameraPosition, pitch) {
        for (let triangle of this.triangles) {
            // Change local space
            triangle.transformLocal(localTransMatrix);
            // Translate to world space
            triangle.translate(this.translation);
            // Transform to View Space
            triangle.transormViewMatrix(cameraViewDir, cameraPosition, pitch);  
        }
    }
    
    transform(localTransMatrix) {
        for (let triangle of this.triangles) {
            // Change local space
            triangle.transformLocal(localTransMatrix);
            // Translate to world space
            triangle.translate(this.translation);
        }
    }
    
    render(context) {
        for (let triangle of this.triangles) {
            // Project mesh
            triangle.renderWireframe(context);
        }
    }
}