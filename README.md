# 3D JS Render

This is a small JS demo to show how to render 3D models in JS.

You can load a file of type **OBJ**

The **OBJ** file format is a simple data-format that represents 3D geometry alone — namely, the position of each vertex, the UV position of each texture coordinate vertex, vertex normals, and the faces that make each polygon defined as a list of vertices, and texture vertices.

This demo only loads the geometry and apply basic shading to polygons, no textures are applied.

## Control Scheme

- w: up
- a: left
- s: down
- r: right
- up arrow: forward
- down arrow: backward
- left arrow: rotate to the left
- right arrow: rotate to the right
- o: look down
- p: look up

## Considerations

This demo was thought to be used with **OBJ** files where the geometry was generated in a left handed coordinate system, if this is not the case the rendering could display glitches.

## Demo

The demo load a map called Temple from a Banjo a Kazooie game by default.

https://jahepi-mx.github.io/3d-js-render
