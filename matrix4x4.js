let matrix4x4Instance = null;

class Matrix4x4 {
    
    constructor() {
        
    }
    
    static getInstance() {
        if (matrix4x4Instance === null) {
            matrix4x4Instance = new Matrix4x4();
        }
        return matrix4x4Instance;
    }
 
    getZRotationM4x4(theta) {  
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        var matrix = [
            cos, -sin, 0, 0,
            sin,  cos, 0, 0,
            0,      0, 1, 0,
            0,      0, 0, 1
        ];
        return matrix;
    }
    
    getYRotationM4x4(theta) {  
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        var matrix = [
            cos,  0, sin, 0,
            0,    1,   0, 0,
            -sin, 0, cos, 0,
            0,    0,   0, 1
        ];
        return matrix;
    }
    
    getXRotationM4x4(theta) {  
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        var matrix = [
            1,   0,    0, 0,
            0, cos, -sin, 0,
            0, sin,  cos, 0,
            0,   0,    0, 1
        ];
        return matrix;
    }
    
    transposeM4x4(matrix) {
        var newMatrix = [];
        for (var a = 0; a < 4 * 4; a++) {
            var x = a % 4;
            var y = parseInt(a / 4);
            var value = matrix[a];
            newMatrix[x * 4 + y] = value;
        }
        return newMatrix;
    }
    
    transform(matrix4x4, vector) {
        var newVector = new Vector(0, 0, 0);
        newVector.x = matrix4x4[0] * vector.x + matrix4x4[1] * vector.y + matrix4x4[2] * vector.z + matrix4x4[3] * vector.w;
        newVector.y = matrix4x4[4] * vector.x + matrix4x4[5] * vector.y + matrix4x4[6] * vector.z + matrix4x4[7] * vector.w;
        newVector.z = matrix4x4[8] * vector.x + matrix4x4[9] * vector.y + matrix4x4[10] * vector.z + matrix4x4[11] * vector.w;
        newVector.w = matrix4x4[12] * vector.x + matrix4x4[13] * vector.y + matrix4x4[14] * vector.z + matrix4x4[15] * vector.w;
        return newVector;
    }
    
    transformM4x4(matrix4x4a, matrix4x4b) {
        var newMatrix = [];
        for (var a = 0, x = 0, y = 0; a < 4 * 4; a++) {
            // (0,0 * 0,0) + (1,0 * 1,0) + (2,0 * 2,0) + (3,0 * 3,0)
            // (0 * 0) + (1 * 4) + (2 * 8) + (3 * 12)
            // (0,0 * 1,0) + (1,0 * 1,1) + (2,0 * 1,2) + (3,0 * 1,3)
            // (0 * 1) + (1 * 5) + (2 * 9) + (3 * 13)
            // (0,0 * 2,0) + (1,0 * 2,1) + (2,0 * 2,2) + (3,0 * 2,3)
            // (0 * 2) + (1 * 6) + (2 * 10) + (3 * 14)
            // (0,0 * 3,0) + (1,0 * 3,1) + (2,0 * 3,2) + (3,0 * 3,3)
            // (0 * 3) + (1 * 7) + (2 * 11) + (3 * 15)
            
            // (0,1 * 0,0) + (1,1 * 1,0) + (2,1 * 2,0) + (3,1 * 3,0)
            // (4 * 0) + (5 * 4) + (6 * 8) + (7 * 12)
            // (0,1 * 1,0) + (1,1 * 1,1) + (2,1 * 1,2) + (3,1 * 1,3)
            // (4 * 1) + (5 * 5) + (6 * 9) + (7 * 13)
            // (0,1 * 2,0) + (1,1 * 2,1) + (2,1 * 2,2) + (3,1 * 2,3)
            // (4 * 2) + (5 * 6) + (6 * 10) + (7 * 14)
            // (0,1 * 3,0) + (1,1 * 3,1) + (2,1 * 3,2) + (3,1 * 3,3)
            // (4 * 3) + (5 * 7) + (6 * 11) + (7 * 15)
            if (a % 4 === 0 && a > 0) {
                x += 4;
            }
            newMatrix[a] = 0;
            for (var i = 0, ny = y; i < 4; i++) {
                var nx = x + i;
                //console.log(nx + "," + ny);
                newMatrix[a] += matrix4x4a[nx] * matrix4x4b[ny];
                ny += 4;                
            }
            //console.log("---->");
            y++;
            y %= 4;
        }
        return newMatrix;
    }
    
    buildOrthonormalMatrix(xAxis, yAxis, zAxis) {
        var matrix = [
            xAxis.x, yAxis.x, zAxis.x, 0,
            xAxis.y, yAxis.y, zAxis.y, 0,
            xAxis.z, yAxis.z, zAxis.z, 0,
                  0,       0,       0, 1,
        ];
        return matrix;
    }
    
    getTranslationOfViewMatrix(cameraPosition) {
        var matrix = [
            1, 0, 0, -cameraPosition.x,
            0, 1, 0, -cameraPosition.y,
            0, 0, 1, -cameraPosition.z,
            0, 0, 0, 1
        ];
        return matrix;
    }
    
    getIdentityMatrix() {
        var matrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        return matrix;
    }
    
    getViewMatrix(cameraViewDir, pitch) {
        var zAxis = cameraViewDir;
        var tmp = new Vector(0, 1, 0);
        var xAxis = tmp.cross(cameraViewDir);          
        var yAxis = cameraViewDir.cross(xAxis);
        
        var orthoNor = this.buildOrthonormalMatrix(xAxis, yAxis, zAxis);
        var camTran = this.transposeM4x4(orthoNor);
        var camRot = this.getXRotationM4x4(pitch);
        var m1 = this.transformM4x4(camRot, camTran);
        m1 = this.transformM4x4(orthoNor, m1);
        yAxis = this.transform(m1, yAxis);
        zAxis = this.transform(m1, zAxis);
        
        var transposed = this.buildOrthonormalMatrix(xAxis, yAxis, zAxis);
        transposed = this.transposeM4x4(transposed);
        return transposed;
    }
    
    get2DProjectionVector(vector) {
        var ratio = 300 / (300 + vector.z);
        var x = vector.x * ratio;
        var y = vector.y * ratio;
        return new Vector(x, y, 0, 0);
    }
}


