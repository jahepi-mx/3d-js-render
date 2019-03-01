class Clipping {
    
    constructor() {
        this.nearPoint = new Vector(0, 0, 1);
        this.nearNormal = new Vector(0, 0, 1);
    }
    
    
    clipNearZPlane(triangle) {

        var outside = [];
        var inside = [];
        
        if (triangle.vWorld1.z > this.nearPoint.z) {
            inside.push(triangle.vWorld1);
        } else {
            outside.push(triangle.vWorld1);
        }
        
        if (triangle.vWorld2.z > this.nearPoint.z) {
            inside.push(triangle.vWorld2);
        } else {
            outside.push(triangle.vWorld2);
        }
        
        if (triangle.vWorld3.z > this.nearPoint.z) {
            inside.push(triangle.vWorld3);
        } else {
            outside.push(triangle.vWorld3);
        }
        
        if (inside.length === 3) {
            return [triangle];
        }
        
        if (inside.length === 1 && outside.length === 2) {
            
            var d1 = this.nearNormal.dot(inside[0].sub(this.nearPoint));
            var d2 = this.nearNormal.dot(outside[0].sub(this.nearPoint));
            var t = d1 / (d1 - d2);
            var i1 = inside[0].add(outside[0].sub(inside[0]).mul(t));
            
            d1 = this.nearNormal.dot(inside[0].sub(this.nearPoint));
            d2 = this.nearNormal.dot(outside[1].sub(this.nearPoint));
            t = d1 / (d1 - d2);
            var i2 = inside[0].add(outside[1].sub(inside[0]).mul(t));
            
            var newTriangle = new Triangle();
            newTriangle.vWorld1 = inside[0];
            newTriangle.vWorld2 = i1;
            newTriangle.vWorld3 = i2;
            newTriangle.vLocal1 = triangle.vLocal1;
            newTriangle.vLocal2 = triangle.vLocal2;
            newTriangle.vLocal3 = triangle.vLocal3;
            return [newTriangle];
        }
        
        if (inside.length === 2 && outside.length === 1) {
            
            var d1 = this.nearNormal.dot(inside[0].sub(this.nearPoint));
            var d2 = this.nearNormal.dot(outside[0].sub(this.nearPoint));
            var t = d1 / (d1 - d2);
            var i1 = inside[0].add(outside[0].sub(inside[0]).mul(t));
            
            var d1 = this.nearNormal.dot(inside[1].sub(this.nearPoint));
            var d2 = this.nearNormal.dot(outside[0].sub(this.nearPoint));
            var t = d1 / (d1 - d2);
            var i2 = inside[1].add(outside[0].sub(inside[1]).mul(t));
            
            var newTriangle1 = new Triangle();
            newTriangle1.vWorld1 = inside[0];
            newTriangle1.vWorld2 = i2;
            newTriangle1.vWorld3 = inside[1];
            newTriangle1.vLocal1 = triangle.vLocal1;
            newTriangle1.vLocal2 = triangle.vLocal2;
            newTriangle1.vLocal3 = triangle.vLocal3;
            
            var newTriangle2 = new Triangle();
            newTriangle2.vWorld1 = inside[0];
            newTriangle2.vWorld2 = i1;
            newTriangle2.vWorld3 = i2;
            newTriangle2.vLocal1 = triangle.vLocal1;
            newTriangle2.vLocal2 = triangle.vLocal2;
            newTriangle2.vLocal3 = triangle.vLocal3;
            
            return [newTriangle1, newTriangle2];
            
        }
        
        // Return empty array if the polygon vertices are outside
        return [];
    }
}
