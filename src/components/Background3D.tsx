import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
    const ref = useRef<THREE.Points>(null!);

    // 3000 dona nuqtalar yaratish
    const positions = useMemo(() => {
        const pos = new Float32Array(3000 * 3);
        for (let i = 0; i < 3000; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state, delta) => {
        // Sekin aylantirish
        ref.current.rotation.x += delta * 0.05;
        ref.current.rotation.y += delta * 0.075;

        // Sichqoncha harakatiga qarab siljish
        const mouseX = state.mouse.x * 0.5;
        const mouseY = state.mouse.y * 0.5;
        ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouseX, 0.1);
        ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouseY, 0.1);
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export default function Background3D() {
    return (
        <div className="fixed inset-0 -z-10 pointer-events-none opacity-40 dark:opacity-30">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleField />
            </Canvas>
        </div>
    );
}

