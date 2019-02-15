let utilsInstance = null;

class Utils {
    
    static getInstance() {
        if (utilsInstance === null) {
            utilsInstance = new Utils();
        }
        return utilsInstance;
    }
    
    generateMesh(textFile) {
	var mesh = new Mesh();
	var lines = textFile.split("\n");
        var vertexs = [];
        var a = 0;
        for (let line of lines) {
            var parts = line.split(" ");
            if (parts[0] === "v") {
                vertexs[a] = new Vector(parts[1], parts[2], parts[3]);
                vertexs[a].mulThis(50);
                a++;
            } else if (parts[0] === "f") {
                var triangle = new Triangle();
                triangle.vLocal1 = vertexs[parseInt(parts[1]) - 1];
                triangle.vLocal2 = vertexs[parseInt(parts[2]) - 1];
                triangle.vLocal3 = vertexs[parseInt(parts[3]) - 1];
                mesh.addTriangle(triangle);
            }
        }
        return mesh;
    }
}