'use client'
import { useEffect, useRef } from 'react'

export default function CoffeeCup3D({ className = '' }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    let animFrameId: number
    const mount = mountRef.current
    const width = mount.clientWidth
    const height = mount.clientHeight

    // ── Dynamic import Three.js ──────────────────────────────────────────────
    import('three').then((THREE) => {
      // Scene
      const scene    = new THREE.Scene()
      const camera   = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
      camera.position.set(0, 0.2, 5.5)

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setClearColor(0x000000, 0)
      mount.appendChild(renderer.domElement)

      // ── Materials ────────────────────────────────────────────────────────
      const cupMat = new THREE.MeshStandardMaterial({
        color: 0xfdf8ed,
        roughness: 0.3,
        metalness: 0.1,
      })
      const coffeeMat = new THREE.MeshStandardMaterial({
        color: 0x3d2416,
        roughness: 0.1,
        metalness: 0.0,
      })
      const steamMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.25,
        roughness: 1,
      })
      const saucerMat = new THREE.MeshStandardMaterial({
        color: 0xfdf8ed,
        roughness: 0.4,
        metalness: 0.05,
      })

      // ── Saucer ───────────────────────────────────────────────────────────
      const saucerGeo = new THREE.CylinderGeometry(1.1, 0.9, 0.12, 40)
      const saucer    = new THREE.Mesh(saucerGeo, saucerMat)
      saucer.position.y = -1.0
      scene.add(saucer)

      // ── Cup body (lathe) ─────────────────────────────────────────────────
      const points: THREE.Vector2[] = []
      const profile = [
        [0.0,  -0.8],
        [0.55, -0.8],
        [0.6,  -0.75],
        [0.65, -0.5],
        [0.7,   0.0],
        [0.75,  0.5],
        [0.78,  0.8],
        [0.8,   0.85],
      ]
      profile.forEach(([x, y]) => points.push(new THREE.Vector2(x, y)))
      const cupGeo  = new THREE.LatheGeometry(points, 48)
      const cup     = new THREE.Mesh(cupGeo, cupMat)
      cup.position.y = -0.05
      scene.add(cup)

      // ── Coffee surface ───────────────────────────────────────────────────
      const coffeeGeo = new THREE.CylinderGeometry(0.76, 0.76, 0.04, 40)
      const coffee    = new THREE.Mesh(coffeeGeo, coffeeMat)
      coffee.position.y = 0.72
      scene.add(coffee)

      // ── Handle ───────────────────────────────────────────────────────────
      const handleCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.78,  0.4, 0),
        new THREE.Vector3(1.25,  0.35, 0),
        new THREE.Vector3(1.3,   0.0, 0),
        new THREE.Vector3(1.25, -0.35, 0),
        new THREE.Vector3(0.78, -0.4, 0),
      ])
      const handleGeo = new THREE.TubeGeometry(handleCurve, 20, 0.07, 10, false)
      const handle    = new THREE.Mesh(handleGeo, cupMat)
      handle.position.y = -0.05
      scene.add(handle)

      // ── Steam wisps ──────────────────────────────────────────────────────
      const steamGroup = new THREE.Group()
      const steamOffsets: number[][] = []
      steamOffsets.forEach(([xOff, phase], i) => {
        const geo  = new THREE.CylinderGeometry(0.04, 0.06, 0.5, 8)
        const mesh = new THREE.Mesh(geo, steamMat)
        mesh.position.set(xOff, 1.1 + i * 0.15, 0)
        mesh.userData.phase = phase
        steamGroup.add(mesh)
      })
      scene.add(steamGroup)

      // ── Lights ───────────────────────────────────────────────────────────
      const ambient = new THREE.AmbientLight(0xfff5e0, 1.2)
      scene.add(ambient)

      const keyLight = new THREE.DirectionalLight(0xfff8f0, 2.5)
      keyLight.position.set(3, 5, 3)
      scene.add(keyLight)

      const fillLight = new THREE.DirectionalLight(0xe2b455, 0.8)
      fillLight.position.set(-3, 2, -2)
      scene.add(fillLight)

      const rimLight = new THREE.DirectionalLight(0xffffff, 0.5)
      rimLight.position.set(0, -2, -4)
      scene.add(rimLight)

      // ── Group everything ─────────────────────────────────────────────────
      const group = new THREE.Group()
      group.add(cup, coffee, handle, saucer, steamGroup)
      scene.add(group)

      // ── Mouse interaction ─────────────────────────────────────────────────
      let targetRotY = 0
      let targetRotX = 0
      let currentRotY = 0
      let currentRotX = 0

      const onMouseMove = (e: MouseEvent) => {
        const rect = mount.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
        const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
        targetRotY =  x * 0.6
        targetRotX = -y * 0.3
      }
      mount.addEventListener('mousemove', onMouseMove)

      // ── Animation loop ───────────────────────────────────────────────────
      let t = 0
      const animate = () => {
        animFrameId = requestAnimationFrame(animate)
        t += 0.016

        // Smooth mouse follow
        currentRotY += (targetRotY - currentRotY) * 0.05
        currentRotX += (targetRotX - currentRotX) * 0.05

        group.rotation.y = currentRotY + t * 0.3
        group.rotation.x = currentRotX * 0.3

        // Steam animation
        steamGroup.children.forEach((child, i) => {
          const mesh = child as THREE.Mesh
          const phase = mesh.userData.phase as number
          mesh.position.y = 1.1 + i * 0.15 + Math.sin(t * 1.5 + phase) * 0.05
          mesh.scale.y    = 0.9 + Math.sin(t * 2 + phase) * 0.1
          ;(mesh.material as THREE.MeshStandardMaterial).opacity =
            0.15 + Math.abs(Math.sin(t + phase)) * 0.15
        })

        renderer.render(scene, camera)
      }
      animate()

      // ── Resize handler ───────────────────────────────────────────────────
      const onResize = () => {
        const w = mount.clientWidth
        const h = mount.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', onResize)

      // ── Cleanup ──────────────────────────────────────────────────────────
      return () => {
        cancelAnimationFrame(animFrameId)
        mount.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement)
        }
      }
    })

    return () => cancelAnimationFrame(animFrameId)
  }, [])

  return (
    <div
      ref={mountRef}
      className={`w-full h-full ${className}`}
      style={{ cursor: 'grab' }}
    />
  )
}
