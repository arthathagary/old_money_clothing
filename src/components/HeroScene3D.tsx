import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  Environment,
  ContactShadows,
  Sparkles as DreiSparkles,
} from '@react-three/drei';
import * as THREE from 'three';

export type Garment3DMode = 'dress' | 'shirt' | 'ensemble';

interface HeroScene3DProps {
  mode: Garment3DMode;
  theme: 'dark' | 'light';
  fabricColor?: string;
}

/**
 * 1. PLEATED SILK MIDI DRESS ON ATELIER DRESSMAKER MANNEQUIN
 * Features a sculpted bodice, gold-buckled waist belt, and a real-time
 * vertex-animated knife-pleated flowing skirt on a brass & walnut stand.
 */
const PleatedSilkDressModel: React.FC<{
  fabricColor: string;
  secondaryColor: string;
  goldColor: string;
}> = ({ fabricColor, secondaryColor, goldColor }) => {
  const skirtMeshRef = useRef<THREE.Mesh>(null);

  // Build custom knife-pleated flared skirt geometry with vertex data for cloth wind simulation
  const { skirtGeometry, basePositions } = useMemo(() => {
    const radialSegments = 128;
    const heightSegments = 48;
    const geom = new THREE.CylinderGeometry(
      0.44, // waist radius
      1.32, // flared hem radius
      2.15, // skirt length
      radialSegments,
      heightSegments,
      true // open-ended like real fabric
    );

    const pos = geom.attributes.position;
    const original = new Float32Array(pos.array.length);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Normalized vertical position: 0 at waist (top), 1 at bottom hem
      const v = (1.075 - y) / 2.15;
      const angle = Math.atan2(z, x);
      const baseRadius = Math.sqrt(x * x + z * z);

      // 28 sharp knife pleats that deepen toward the hem + soft S-curve flare
      const pleatAmplitude = 0.012 + Math.pow(v, 1.35) * 0.068;
      const pleatWave = Math.sin(angle * 28) * pleatAmplitude;
      const drapeFlare = Math.pow(v, 1.8) * 0.14;

      const finalRadius = baseRadius + pleatWave + drapeFlare;
      const nx = Math.cos(angle) * finalRadius;
      const nz = Math.sin(angle) * finalRadius;

      pos.setXYZ(i, nx, y, nz);
      original[i * 3] = nx;
      original[i * 3 + 1] = y;
      original[i * 3 + 2] = nz;
    }

    geom.computeVertexNormals();
    return { skirtGeometry: geom, basePositions: original };
  }, []);

  // Animate gentle breeze rippling through the pleated dress hem
  useFrame(({ clock }) => {
    if (!skirtMeshRef.current) return;
    const t = clock.getElapsedTime();
    const pos = skirtMeshRef.current.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const ox = basePositions[i * 3];
      const oy = basePositions[i * 3 + 1];
      const oz = basePositions[i * 3 + 2];

      const v = (1.075 - oy) / 2.15; // 0 at waist, 1 at hem
      const angle = Math.atan2(oz, ox);

      const windRipple =
        (Math.sin(angle * 5 + t * 2.2) * 0.045 +
          Math.cos(angle * 11 - t * 1.6) * 0.02) *
        Math.pow(v, 1.6);

      const radius = Math.sqrt(ox * ox + oz * oz) + windRipple;
      pos.setXYZ(
        i,
        Math.cos(angle) * radius,
        oy + Math.sin(angle * 6 + t * 2) * 0.015 * v,
        Math.sin(angle) * radius
      );
    }

    pos.needsUpdate = true;
    skirtMeshRef.current.geometry.computeVertexNormals();
  });

  // Sculpted Bodice Lathe
  const bodiceGeometry = useMemo(() => {
    const pts = [
      new THREE.Vector2(0.44, 0.0), // waist
      new THREE.Vector2(0.46, 0.25),
      new THREE.Vector2(0.56, 0.58), // bust contour
      new THREE.Vector2(0.51, 0.85), // upper chest
      new THREE.Vector2(0.36, 1.08), // halter/sweetheart taper
    ];
    return new THREE.LatheGeometry(pts, 64);
  }, []);

  return (
    <group position={[0, 0.15, 0]}>
      {/* Inner Atelier Mannequin Neck & Finial */}
      <mesh position={[0, 1.32, 0]} castShadow>
        <cylinderGeometry args={[0.17, 0.22, 0.42, 32]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.55} />
      </mesh>
      {/* Turned Walnut Finial Cap */}
      <mesh position={[0, 1.58, 0]} castShadow>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial color="#3B2618" roughness={0.35} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.48, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.05, 24]} />
        <meshStandardMaterial color={goldColor} metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Tailored Dress Bodice */}
      <mesh
        geometry={bodiceGeometry}
        position={[0, 0.12, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={fabricColor}
          roughness={0.38}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Crossed Halter / Lapel Collar Straps */}
      <mesh position={[-0.18, 1.05, 0.22]} rotation={[0.35, 0.2, -0.35]} castShadow>
        <boxGeometry args={[0.14, 0.52, 0.03]} />
        <meshStandardMaterial color={fabricColor} roughness={0.35} />
      </mesh>
      <mesh position={[0.18, 1.05, 0.22]} rotation={[0.35, -0.2, 0.35]} castShadow>
        <boxGeometry args={[0.14, 0.52, 0.03]} />
        <meshStandardMaterial color={fabricColor} roughness={0.35} />
      </mesh>

      {/* Tailored Waist Belt with Brushed Gold Buckle */}
      <mesh position={[0, 0.14, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.45, 0.038, 20, 64]} />
        <meshStandardMaterial color="#1B1815" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.14, 0.46]} castShadow>
        <boxGeometry args={[0.14, 0.1, 0.035]} />
        <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.12} />
      </mesh>

      {/* Flowing Knife-Pleated Silk Midi Skirt */}
      <mesh
        ref={skirtMeshRef}
        geometry={skirtGeometry}
        position={[0, -0.94, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={fabricColor}
          roughness={0.34}
          metalness={0.06}
          clearcoat={0.15}
          clearcoatRoughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Subtle Gold Hem Trim Ring */}
      <mesh position={[0, -1.96, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.38, 0.008, 12, 96]} />
        <meshStandardMaterial color={goldColor} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Brushed Brass Mannequin Stand Pole & Pedestal Base */}
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 2.2, 24]} />
        <meshStandardMaterial color={goldColor} metalness={0.9} roughness={0.18} />
      </mesh>
      <mesh position={[0, -2.38, 0]} receiveShadow>
        <cylinderGeometry args={[0.55, 0.65, 0.1, 48]} />
        <meshStandardMaterial color="#231B15" roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[0, -2.32, 0]}>
        <cylinderGeometry args={[0.22, 0.35, 0.08, 32]} />
        <meshStandardMaterial color={goldColor} metalness={0.92} roughness={0.15} />
      </mesh>
    </group>
  );
};

/**
 * 2. CUBAN-COLLAR LINEN SHIRT / HEAVYWEIGHT POLO ON SAVILE ROW HANGER
 * Features a contoured wooden coat hanger, brass hook, tailored torso,
 * folded collar, angled sleeves with cuffs, placket with Mother-of-Pearl buttons, and chest pocket.
 */
const TailoredShirtOnHangerModel: React.FC<{
  fabricColor: string;
  secondaryColor: string;
  goldColor: string;
}> = ({ fabricColor, secondaryColor, goldColor }) => {
  const shirtGroupRef = useRef<THREE.Group>(null);
  const torsoMeshRef = useRef<THREE.Mesh>(null);

  // Build sculpted shirt torso (wider at chest/shoulders, gentle drape at bottom hem)
  const { torsoGeometry, baseTorsoPositions } = useMemo(() => {
    const geom = new THREE.CylinderGeometry(0.76, 0.72, 2.15, 64, 36, false);
    // Flatten front-to-back so it looks like a real tailored garment on a hanger (not a round barrel)
    geom.scale(1.08, 1, 0.42);

    const pos = geom.attributes.position;
    const orig = new Float32Array(pos.array.length);

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Shoulder slope at the top + subtle chest contour + vertical drape folds
      const normalizedY = (y + 1.075) / 2.15; // 0 at bottom hem, 1 at shoulders
      const angle = Math.atan2(z, x);
      const foldWave =
        Math.sin(angle * 10) * 0.018 * (1 - normalizedY * 0.6);

      const nx = x + Math.cos(angle) * foldWave;
      const nz = z + Math.sin(angle) * foldWave;

      pos.setXYZ(i, nx, y, nz);
      orig[i * 3] = nx;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = nz;
    }

    geom.computeVertexNormals();
    return { torsoGeometry: geom, baseTorsoPositions: orig };
  }, []);

  // Subtle fabric breeze on the hanging shirt body
  useFrame(({ clock }) => {
    if (!torsoMeshRef.current) return;
    const t = clock.getElapsedTime();
    const pos = torsoMeshRef.current.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const ox = baseTorsoPositions[i * 3];
      const oy = baseTorsoPositions[i * 3 + 1];
      const oz = baseTorsoPositions[i * 3 + 2];

      const v = (1.075 - oy) / 2.15; // 0 at top, 1 at bottom hem
      const breezeZ = Math.sin(ox * 4 + t * 2.1) * 0.028 * Math.pow(v, 1.4);

      pos.setXYZ(i, ox, oy, oz + breezeZ);
    }
    pos.needsUpdate = true;
    torsoMeshRef.current.geometry.computeVertexNormals();
  });

  // Brass Hook Curve
  const hookCurve = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.52, 0),
      new THREE.Vector3(0, 1.72, 0),
      new THREE.Vector3(0.16, 1.92, 0),
      new THREE.Vector3(0, 2.12, 0),
      new THREE.Vector3(-0.14, 1.98, 0),
    ]);
    return new THREE.TubeGeometry(curve, 36, 0.022, 16, false);
  }, []);

  return (
    <group ref={shirtGroupRef} position={[0, 0.05, 0]}>
      {/* Savile Row Brass Hanger Hook */}
      <mesh geometry={hookCurve} castShadow>
        <meshStandardMaterial color={goldColor} metalness={0.94} roughness={0.12} />
      </mesh>

      {/* Walnut Wooden Coat Hanger Bar */}
      <mesh position={[-0.48, 1.38, 0]} rotation={[0, 0, 0.24]} castShadow>
        <boxGeometry args={[1.05, 0.09, 0.11]} />
        <meshStandardMaterial color="#3D2516" roughness={0.35} />
      </mesh>
      <mesh position={[0.48, 1.38, 0]} rotation={[0, 0, -0.24]} castShadow>
        <boxGeometry args={[1.05, 0.09, 0.11]} />
        <meshStandardMaterial color="#3D2516" roughness={0.35} />
      </mesh>
      <mesh position={[0, 1.49, 0]} castShadow>
        <boxGeometry args={[0.28, 0.11, 0.13]} />
        <meshStandardMaterial color={goldColor} metalness={0.88} roughness={0.2} />
      </mesh>

      {/* Main Tailored Shirt Torso */}
      <mesh
        ref={torsoMeshRef}
        geometry={torsoGeometry}
        position={[0, 0.18, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={fabricColor}
          roughness={0.48}
          metalness={0.05}
        />
      </mesh>

      {/* Shoulder Yoke Cap */}
      <mesh position={[0, 1.24, 0]} scale={[1.1, 0.25, 0.44]} castShadow>
        <sphereGeometry args={[0.76, 48, 24]} />
        <meshStandardMaterial color={fabricColor} roughness={0.48} />
      </mesh>

      {/* Left Tailored Sleeve + Ribbed Cuff */}
      <group position={[-0.86, 1.12, 0]} rotation={[0, 0, 0.46]}>
        <mesh position={[0, -0.52, 0]} scale={[1, 1, 0.72]} castShadow>
          <cylinderGeometry args={[0.25, 0.21, 1.12, 36]} />
          <meshStandardMaterial color={fabricColor} roughness={0.48} />
        </mesh>
        {/* Contrast Tipped Cuff */}
        <mesh position={[0, -1.06, 0]} scale={[1.02, 1, 0.74]}>
          <cylinderGeometry args={[0.212, 0.212, 0.12, 36]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.42} />
        </mesh>
      </group>

      {/* Right Tailored Sleeve + Ribbed Cuff */}
      <group position={[0.86, 1.12, 0]} rotation={[0, 0, -0.46]}>
        <mesh position={[0, -0.52, 0]} scale={[1, 1, 0.72]} castShadow>
          <cylinderGeometry args={[0.25, 0.21, 1.12, 36]} />
          <meshStandardMaterial color={fabricColor} roughness={0.48} />
        </mesh>
        {/* Contrast Tipped Cuff */}
        <mesh position={[0, -1.06, 0]} scale={[1.02, 1, 0.74]}>
          <cylinderGeometry args={[0.212, 0.212, 0.12, 36]} />
          <meshStandardMaterial color={secondaryColor} roughness={0.42} />
        </mesh>
      </group>

      {/* Cuban Camp Collar (Left & Right Folded Lapels + Neck Ring) */}
      <mesh
        position={[0, 1.32, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1.05, 0.7, 1]}
      >
        <torusGeometry args={[0.31, 0.065, 20, 48, Math.PI * 1.35]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.4} />
      </mesh>
      {/* Left Collar Point */}
      <mesh
        position={[-0.22, 1.18, 0.29]}
        rotation={[0.3, 0.25, 0.52]}
        castShadow
      >
        <boxGeometry args={[0.28, 0.18, 0.03]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.4} />
      </mesh>
      {/* Right Collar Point */}
      <mesh
        position={[0.22, 1.18, 0.29]}
        rotation={[0.3, -0.25, -0.52]}
        castShadow
      >
        <boxGeometry args={[0.28, 0.18, 0.03]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.4} />
      </mesh>

      {/* Center Front Button Placket */}
      <mesh position={[0, 0.18, 0.318]} castShadow>
        <boxGeometry args={[0.11, 2.08, 0.025]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.42} />
      </mesh>

      {/* 6 Mother-of-Pearl Buttons along the Placket */}
      {[0.92, 0.58, 0.24, -0.1, -0.44, -0.78].map((yPos, idx) => (
        <mesh
          key={idx}
          position={[0, yPos, 0.338]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.028, 0.028, 0.014, 24]} />
          <meshPhysicalMaterial
            color="#FAF6EE"
            roughness={0.15}
            metalness={0.3}
            clearcoat={1}
          />
        </mesh>
      ))}

      {/* Left Chest Atelier Pocket + Gold Monogram Bar */}
      <mesh position={[-0.36, 0.56, 0.31]} rotation={[0, -0.14, 0]} castShadow>
        <boxGeometry args={[0.28, 0.32, 0.025]} />
        <meshStandardMaterial color={fabricColor} roughness={0.45} />
      </mesh>
      <mesh position={[-0.36, 0.69, 0.326]} rotation={[0, -0.14, 0]}>
        <boxGeometry args={[0.16, 0.022, 0.015]} />
        <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.12} />
      </mesh>
    </group>
  );
};

/**
 * 3. FULL OLD MONEY ENSEMBLE: HEAVYWEIGHT TEE + DOUBLE-PLEATED GURKHA TROUSERS
 * Features a structured upper tee tucked into high-waisted Gurkha pleated trousers
 * with extended buckle waist tabs and cuffed tapered trouser legs.
 */
const TailoredGurkhaEnsembleModel: React.FC<{
  fabricColor: string;
  secondaryColor: string;
  goldColor: string;
}> = ({ fabricColor, secondaryColor, goldColor }) => {
  return (
    <group position={[0, 0.1, 0]}>
      {/* Upper Heavyweight Supima Tee Torso */}
      <mesh position={[0, 0.88, 0]} scale={[1.05, 1, 0.48]} castShadow>
        <cylinderGeometry args={[0.68, 0.54, 1.25, 48]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.45} />
      </mesh>

      {/* Crewneck Ribbed Collar */}
      <mesh
        position={[0, 1.5, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[1, 0.65, 1]}
      >
        <torusGeometry args={[0.26, 0.045, 16, 48]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.4} />
      </mesh>

      {/* Tee Short Sleeves */}
      <mesh
        position={[-0.74, 1.15, 0]}
        rotation={[0, 0, 0.52]}
        scale={[1, 1, 0.72]}
        castShadow
      >
        <cylinderGeometry args={[0.22, 0.2, 0.68, 32]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.45} />
      </mesh>
      <mesh
        position={[0.74, 1.15, 0]}
        rotation={[0, 0, -0.52]}
        scale={[1, 1, 0.72]}
        castShadow
      >
        <cylinderGeometry args={[0.22, 0.2, 0.68, 32]} />
        <meshStandardMaterial color={secondaryColor} roughness={0.45} />
      </mesh>

      {/* High-Waisted Gurkha Cummerbund Waistband + Twin Brass Buckles */}
      <mesh position={[0, 0.22, 0]} scale={[1.06, 1, 0.52]} castShadow>
        <cylinderGeometry args={[0.55, 0.58, 0.24, 48]} />
        <meshStandardMaterial color={fabricColor} roughness={0.42} />
      </mesh>
      {/* Left & Right Gurkha Brass Buckles */}
      <mesh position={[-0.22, 0.24, 0.3]} castShadow>
        <boxGeometry args={[0.09, 0.08, 0.03]} />
        <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.12} />
      </mesh>
      <mesh position={[0.22, 0.24, 0.3]} castShadow>
        <boxGeometry args={[0.09, 0.08, 0.03]} />
        <meshStandardMaterial color={goldColor} metalness={0.95} roughness={0.12} />
      </mesh>

      {/* Trouser Seat / Hip Block */}
      <mesh position={[0, -0.08, 0]} scale={[1.06, 1, 0.54]} castShadow>
        <cylinderGeometry args={[0.58, 0.62, 0.42, 48]} />
        <meshStandardMaterial color={fabricColor} roughness={0.42} />
      </mesh>

      {/* Left Pleated Trouser Leg + Pressed Crease + Turn-Up Cuff */}
      <group position={[-0.31, -1.12, 0]} rotation={[0, 0, 0.03]}>
        <mesh scale={[1, 1, 0.85]} castShadow>
          <cylinderGeometry args={[0.31, 0.23, 1.85, 36]} />
          <meshStandardMaterial color={fabricColor} roughness={0.42} />
        </mesh>
        {/* Sharp Front Pressed Crease Ridge */}
        <mesh position={[0, 0, 0.24]} castShadow>
          <boxGeometry args={[0.025, 1.82, 0.04]} />
          <meshStandardMaterial color={fabricColor} roughness={0.38} />
        </mesh>
        {/* 2-Inch Tailored Turn-Up Ankle Cuff */}
        <mesh position={[0, -0.88, 0]} scale={[1.04, 1, 0.88]}>
          <cylinderGeometry args={[0.235, 0.235, 0.14, 36]} />
          <meshStandardMaterial color={fabricColor} roughness={0.4} />
        </mesh>
      </group>

      {/* Right Pleated Trouser Leg + Pressed Crease + Turn-Up Cuff */}
      <group position={[0.31, -1.12, 0]} rotation={[0, 0, -0.03]}>
        <mesh scale={[1, 1, 0.85]} castShadow>
          <cylinderGeometry args={[0.31, 0.23, 1.85, 36]} />
          <meshStandardMaterial color={fabricColor} roughness={0.42} />
        </mesh>
        {/* Sharp Front Pressed Crease Ridge */}
        <mesh position={[0, 0, 0.24]} castShadow>
          <boxGeometry args={[0.025, 1.82, 0.04]} />
          <meshStandardMaterial color={fabricColor} roughness={0.38} />
        </mesh>
        {/* 2-Inch Tailored Turn-Up Ankle Cuff */}
        <mesh position={[0, -0.88, 0]} scale={[1.04, 1, 0.88]}>
          <cylinderGeometry args={[0.235, 0.235, 0.14, 36]} />
          <meshStandardMaterial color={fabricColor} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
};

const GarmentAtelierShowcase: React.FC<HeroScene3DProps> = ({
  mode,
  theme,
  fabricColor = '#1B352A',
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;
    const scrollProgress = Math.min(1, scrollYRef.current / 900);

    // Gentle turntable sway + mouse parallax + scroll rotation
    const targetRotY =
      Math.sin(state.clock.elapsedTime * 0.45) * 0.38 +
      pointerX * 0.65 +
      scrollProgress * Math.PI * 0.65;

    const targetRotX = -pointerY * 0.22 + scrollProgress * 0.18;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      delta * 3.5
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      delta * 3.5
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -scrollProgress * 0.65,
      delta * 3.5
    );

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }
  });

  const secondaryColor =
    fabricColor.toLowerCase() === '#f4f0e8'
      ? '#1B352A'
      : theme === 'dark'
      ? '#F4F0E8'
      : '#EFECE6';
  const champagneGold = '#C5A059';

  return (
    <group ref={groupRef} scale={0.98}>
      <Float speed={1.4} rotationIntensity={0.12} floatIntensity={0.35}>
        {mode === 'dress' && (
          <PleatedSilkDressModel
            fabricColor={fabricColor}
            secondaryColor={secondaryColor}
            goldColor={champagneGold}
          />
        )}

        {mode === 'shirt' && (
          <TailoredShirtOnHangerModel
            fabricColor={fabricColor}
            secondaryColor={secondaryColor}
            goldColor={champagneGold}
          />
        )}

        {mode === 'ensemble' && (
          <TailoredGurkhaEnsembleModel
            fabricColor={fabricColor}
            secondaryColor={secondaryColor}
            goldColor={champagneGold}
          />
        )}

        {/* Framing Brushed-Gold Showroom Halo Behind Garment */}
        <mesh ref={ringRef} position={[0, 0.1, -0.65]}>
          <torusGeometry args={[1.95, 0.015, 20, 120]} />
          <meshStandardMaterial
            color={champagneGold}
            metalness={0.92}
            roughness={0.15}
          />
        </mesh>
      </Float>

      {/* Subtle Ambient Gold Atelier Dust */}
      <DreiSparkles
        count={36}
        scale={5}
        size={1.4}
        speed={0.25}
        opacity={0.4}
        color={champagneGold}
      />
    </group>
  );
};

export const HeroScene3D: React.FC<HeroScene3DProps> = ({
  mode,
  theme,
  fabricColor,
}) => {
  return (
    <div className="w-full h-full relative" data-cursor="3D">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.15, 5.6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={theme === 'dark' ? 0.75 : 1.15} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={theme === 'dark' ? 2.3 : 2.6}
          color="#FFF8E7"
          castShadow
        />
        <pointLight position={[-4, -2, 3]} intensity={1.5} color="#C5A059" />
        <pointLight position={[2, 3, -4]} intensity={1.2} color="#274E3E" />

        <GarmentAtelierShowcase
          mode={mode}
          theme={theme}
          fabricColor={fabricColor}
        />

        <Environment preset="city" />
        <ContactShadows
          position={[0, -2.42, 0]}
          opacity={theme === 'dark' ? 0.5 : 0.28}
          scale={7.5}
          blur={2.2}
          far={4}
        />
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
