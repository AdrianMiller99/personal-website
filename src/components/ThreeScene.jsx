import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeScene = () => {
    const mountRef = useRef(null);
    const modelRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = null;

        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

        const updateSize = () => {
            const width = window.innerWidth < 1024 ? window.innerWidth - 32 : Math.min(window.innerWidth * 0.4, window.innerHeight * 0.6);
            const height = window.innerWidth < 1024 ? width : width;
            setSize({ width, height });
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        updateSize();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.setClearColor(0x000000, 0);
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0xffffff, 600);
        pointLight.position.set(-5, 5, -5);
        scene.add(pointLight);

        camera.position.set(0, 3, 8);
        camera.lookAt(0, 0, 0);

        const loader = new GLTFLoader();
        const modelPath = './retro_computer4.glb';

        loader.load(
            modelPath,
            (gltf) => {
                modelRef.current = gltf.scene;
                scene.add(modelRef.current);

                const box = new THREE.Box3().setFromObject(modelRef.current);
                const center = box.getCenter(new THREE.Vector3());
                modelRef.current.position.sub(center);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('Error loading model:', error);
            }
        );

        const handleMouseMove = (event) => {
            if (modelRef.current) {
                const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                const rotation = mouseX * Math.PI / 9;
                modelRef.current.rotation.y = rotation;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', updateSize);

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', updateSize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: `${size.width}px`,
                height: `${size.height}px`,
                maxWidth: '100%',
                maxHeight: '100%'
            }}
        />
    );
};

export default ThreeScene;