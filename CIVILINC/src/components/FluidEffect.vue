<template>
  <div class="fluid-container">
    <canvas ref="canvas" class="fluid-canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'FluidEffect',
  mounted() {
    this.initFluidEffect()
  },
  methods: {
    initFluidEffect() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      
      // Set canvas size
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)

      // Fluid simulation parameters
      const numParticles = 50
      const particles = []
      
      // Create particles
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 50 + 20
        })
      }

      // Animation loop
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Update and draw particles
        particles.forEach(particle => {
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy
          
          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
          
          // Draw particle
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius
          )
          gradient.addColorStop(0, 'rgba(0, 255, 135, 0.1)')
          gradient.addColorStop(1, 'rgba(96, 239, 255, 0)')
          
          ctx.beginPath()
          ctx.fillStyle = gradient
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fill()
        })
        
        requestAnimationFrame(animate)
      }
      
      animate()
    }
  }
}
</script>

<style scoped>
.fluid-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.fluid-canvas {
  width: 100%;
  height: 100%;
}
</style> 