<template>
  <div class="home-container">
    <fluid-effect />
    <!-- Simplified Navbar with just brand name -->
    <div class="navbar">
      <div class="brand">
        <span class="brand-text"><span class="code-brackets">&lt;/&gt;</span> </> Civilinc</span>
        </div>
        </div>

    <!-- Combined Hero and Testimonial Section -->
    <div class="main-content">
      <div class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title animate-text">Unifying Urban Departments for Smart Cities</h1>
          <p class="hero-description animate-fade">
            Civilinc is a collaborative platform designed to streamline
            communication and coordination between city departments—driving
            efficiency, transparency, and smarter governance.
          </p>
          <router-link to="/sign-in" class="cta-button animate-bounce">
            Sign in now
          </router-link>
        </div>
      </div>

      <div class="testimonial-section">
        <h2 class="testimonial-title animate-slide">Testimonials</h2>
        <div class="testimonial-grid">
          <div class="testimonial-card animate-fade-up">
            <div class="testimonial-content">
              <div class="testimonial-header">
                <div class="author-image">
                  <img src="/charulatha-photo-300h.png" alt="Charulatha Somal" />
                </div>
                <div class="author-info">
                  <span class="author-name">Charulatha Somal</span>
                  <span class="author-title">Deputy Secretary</span>
                  <span class="author-org">Dept of Personnel & Training</span>
                  <span class="author-location">New Delhi, India</span>
        </div>
        </div>
              <p class="testimonial-text">
                The digital platform for inter-departmental cooperation, Citilinc, developed by Yuvaraj S. Yali, a 2nd-year B.Tech Electronics and Communication student at MIT Manipal, Udupi, Karnataka, is a forward-thinking solution designed to streamline coordination among urban governance departments. Its features—such as real-time project tracking, geo-tagged data sharing, and secure communication—have enabled officers to monitor development activities more effectively and make informed decisions faster.

By promoting transparency, accountability, and collaboration, Citilinc stands out as a powerful tool for improving project execution and reducing administrative delays. I see immense potential in its ability to support smart, sustainable urban development and highly recommend its implementation across city administrations.


              </p>
        </div>
        </div>

          <div class="testimonial-card animate-fade-up">
            <div class="testimonial-content">
              <div class="testimonial-header">
                <div class="author-image">
                  <img src="/chidanand-vatare-2-200h.jpg" alt="Chidanand Vatare" />
        </div>
                <div class="author-info">
                  <span class="author-name">Chidanand Vatare</span>
                  <span class="author-title">Ex-Managing Director</span>
                  <span class="author-org">Shimoga Smart City Company Limited</span>
                  <span class="author-location">Shimoga, Karnataka, India</span>
        </div>
        </div>
              <p class="testimonial-text">
                The Digital Platform for Inter-Departmental Cooperation, Civilinc, developed by Yuvaraj S. Yali, a 2nd-year B.Tech Electronics and Communication student at MIT Manipal, Udupi, Karnataka, is an innovative solution designed to improve coordination among urban governance departments. This platform could have greatly benefited the Shimoga Smart City project by optimizing resource utilization, enhancing data sharing, and streamlining project execution—critical areas where challenges were faced. Its ability to promote transparency and public engagement makes it a valuable tool for any city administration. I see immense potential in this platform to support effective and timely project delivery, reduce delays, and improve collaboration across departments. I highly recommend its implementation to foster better urban governance and sustainable development.
              </p>
        </div>
        </div>
        </div>
        </div>
        </div>
    <MLModelInteraction />
  </div>
</template>

<script>
import FluidEffect from '../components/FluidEffect.vue'
import MLModelInteraction from '../components/MLModelInteraction.vue'

export default {
  name: 'Home',
  components: {
    FluidEffect,
    MLModelInteraction
  },
  data() {
    return {
      // Add any necessary data properties here
    }
  },
  mounted() {
    // Add fluid distortion effect initialization here
    this.initializeFluidEffect()
  },
  methods: {
    initializeFluidEffect() {
      // We'll implement the fluid distortion effect here
    }
  }
}
</script>

<style scoped>
.home-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 2rem;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}
 
.brand-text {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(45deg, #00ff87, #60efff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 255, 135, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
 
.code-brackets {
  font-family: 'Fira Code', monospace;
  font-size: 1.8rem;
  opacity: 0.8;
}
 
.main-content {
  padding-top: 80px;
  position: relative;
}
 
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  background: url('https://images.unsplash.com/photo-1530533599658-152cfaf099b6?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDQ4fHxncmVlbiUyMGNpdHl8ZW58MHx8fHwxNzQ3MjI4MDM4fDA&ixlib=rb-4.1.0&w=1500') center/cover;
}
 
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
}
 
.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  text-align: center;
}
 
.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #ffffff, #60efff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(96, 239, 255, 0.3);
}
 
.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
}
 
.cta-button {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #000;
  background: linear-gradient(45deg, #00ff87, #60efff);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
 
.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 255, 135, 0.3);
}

.testimonial-section {
  padding: 4rem 2rem;
  background: linear-gradient(
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.8)
  ),
  url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80') center/cover fixed;
  position: relative;
}
 
.testimonial-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 255, 135, 0.1), rgba(96, 239, 255, 0.1));
  pointer-events: none;
}
 
.testimonial-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #00ff87, #60efff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
 
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
 
.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}
 
.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 255, 135, 0.1);
}
 
.testimonial-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
}
 
.testimonial-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}
 
.author-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0, 255, 135, 0.3);
  transition: transform 0.3s ease;
}

.author-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
 
.author-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.author-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #00ff87;
}

.author-title {
  font-size: 1rem;
  color: #60efff;
  font-weight: 500;
}
 
.author-org {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
}
 
.author-location {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}
 
.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  flex-grow: 1;
}
 
/* Animation Classes */
.animate-text {
  animation: textReveal 1s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}
 
.animate-fade {
  animation: fadeIn 1s ease-out 0.5s forwards;
  opacity: 0;
}
 
.animate-bounce {
  animation: bounceIn 1s ease-out 1s forwards;
  opacity: 0;
}
 
.animate-slide {
  animation: slideIn 1s ease-out forwards;
  opacity: 0;
}
 
.animate-fade-up {
  animation: fadeUp 1s ease-out forwards;
  opacity: 0;
}
 
/* Animation Keyframes */
@keyframes textReveal {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
}
}

@keyframes fadeIn {
  0% {
    opacity: 0;
}
  100% {
    opacity: 1;
}
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
}
  50% {
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
}
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
}
}

@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
}
}

/* Fluid Distortion Effect */
@keyframes fluidDistortion {
  0% {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
}
  50% {
    transform: translate(-50%, -50%) rotate(180deg) scale(1.1);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) scale(1);
  }
}
 
.fluid-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  background: radial-gradient(circle, rgba(0,255,135,0.1) 0%, rgba(96,239,255,0.1) 100%);
  animation: fluidDistortion 20s infinite linear;
  pointer-events: none;
  z-index: 0;
}
</style>
