import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./section_five.css";

export default function SectionFive() {
  const cubeRef = useRef<THREE.Mesh | null>(null); // Create a ref for the cube

  useEffect(() => {
    // Custom canvas dimensions
    const canvasWidth = 500;
    const canvasHeight = canvasWidth * (9 / 16);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasWidth / canvasHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.shadowMap.enabled = true; // Enable shadow maps

    const myCanvas = document.getElementById("canvas");
    myCanvas?.appendChild(renderer.domElement); // Append renderer's DOM element

    // Create a cube (box geometry)
    const geometry = new THREE.BoxGeometry(1, 1, 1); // Width, height, depth
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00, // Green color
    }); // Use MeshStandardMaterial to react to light
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true; // Enable the cube to cast shadows
    cube.position.y = 2;
    scene.add(cube);

    // Store the cube in the ref
    cubeRef.current = cube; // Assign the created cube to the ref

    // Create a floor
    const floorGeometry = new THREE.PlaneGeometry(7, 7); // Width, height
    const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa }); // Grey color
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2; // Rotate to lay flat
    floor.position.y = -2;
    floor.position.z = -1;
    floor.receiveShadow = true; // Enable the floor to receive shadows
    scene.add(floor);

    // Add a light source
    const light = new THREE.DirectionalLight(0xffffff, 0.5); // White light
    light.position.set(1, 2, 1); // Position it at the top-right
    light.castShadow = true; // Enable the light to cast shadows
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040)); // Soft ambient light

    // Set the camera position
    camera.position.z = 7;
    camera.position.y = 1; // Adjust camera height

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);

      // Rotate the cube
      cube.rotation.x += 0.01; // Rotate around x-axis
      cube.rotation.y += 0.01; // Rotate around y-axis

      renderer.render(scene, camera);
    };

    // Start the animation
    animate();

    // Cleanup on unmount
    return () => {
      myCanvas?.removeChild(renderer.domElement); // Remove the renderer's DOM element
      renderer.dispose(); // Dispose the renderer
    };
  }, []); // Empty dependency array to run once on mount

  // Function to move the cube up
  const moveUp = () => {
    if (cubeRef.current) {
      // Incrementally move the cube up
      cubeRef.current.position.y += -1; // Move the cube up by 0.1 units
    }
  };

  return (
    <>
      <div id="canvas" className="canvas-container"></div>
      <button onClick={moveUp}>move down the cube</button>
    </>
  );
}
