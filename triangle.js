class Triangle {
    
    constructor() {
        this.vLocal1 = new Vector(0, 0, 0);
        this.vLocal2 = new Vector(0, 0, 0);
        this.vLocal3 = new Vector(0, 0, 0);
        
        this.vWorld1 = new Vector(0, 0, 0);
        this.vWorld2 = new Vector(0, 0, 0);
        this.vWorld3 = new Vector(0, 0, 0);
        
        this.vCam1 = new Vector(0, 0, 0);
        this.vCam2 = new Vector(0, 0, 0);
        this.vCam3 = new Vector(0, 0, 0);
        
        this.matrix4x4 = Matrix4x4.getInstance();
    }
    
    transformToCameraView(matrix) {
        this.vCam1 = this.matrix4x4.transform(matrix, this.vWorld1);
        this.vCam2 = this.matrix4x4.transform(matrix, this.vWorld2);
        this.vCam3 = this.matrix4x4.transform(matrix, this.vWorld3);
    }
    
    transformLocal(matrix) {
        this.vLocal1 = this.matrix4x4.transform(matrix, this.vLocal1);
        this.vLocal2 = this.matrix4x4.transform(matrix, this.vLocal2);
        this.vLocal3 = this.matrix4x4.transform(matrix, this.vLocal3);
    }
    
    translate(vector) {
        this.vWorld1 = this.vLocal1.add(vector);
        this.vWorld2 = this.vLocal2.add(vector);
        this.vWorld3 = this.vLocal3.add(vector);
    }
    
    getLocalNormal() {
        var sub1 = this.vLocal2.sub(this.vLocal1);
        var sub2 = this.vLocal3.sub(this.vLocal1);
        return sub1.cross(sub2).normalizeThis().mulThis(10);
    }
    
    getCameraNormal() {
        
    }
    
    renderWireframe(context) {
        var vWorld1 = this.matrix4x4.get2DProjectionVector(this.vWorld1);
        var vWorld2 = this.matrix4x4.get2DProjectionVector(this.vWorld2);
        var vWorld3 = this.matrix4x4.get2DProjectionVector(this.vWorld3);
        context.beginPath();
        context.strokeStyle = "#ccc";
        context.moveTo(origX + vWorld1.x, origY - vWorld1.y);
        context.lineTo(origX + vWorld2.x, origY - vWorld2.y);
        context.lineTo(origX + vWorld3.x, origY - vWorld3.y);
        context.lineTo(origX + vWorld1.x, origY - vWorld1.y);
        context.stroke();
        
        // Draw normal
        var normal = this.getLocalNormal().add(this.vWorld1);
        normal = this.matrix4x4.get2DProjectionVector(normal);
        context.beginPath();
        context.strokeStyle = "#ff0000";
        context.moveTo(origX + vWorld1.x, origY - vWorld1.y);
        context.lineTo(origX + normal.x, origY - normal.y);
        context.stroke();
    }
}