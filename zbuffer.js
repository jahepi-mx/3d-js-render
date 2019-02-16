class ZBuffer {
    
    constructor(meshes) {
        this.triangles = [];
        for (let mesh of meshes) {
            for (let triangle of mesh.triangles) {
                if (triangle.isVisible()) {
                    this.triangles.push(triangle);
                }
            }
        }
    }
    
    sort() {
        this.triangles.sort(function(t1, t2) {
            return t1.getAverageZ() > t2.getAverageZ() ? -1 : t1.getAverageZ() < t2.getAverageZ() ? 1 : 0;
        });
    }
}


