<template>
  <div class="sign-in-page-container">
    <div class="sign-in-content">
      
      <!-- Image Section -->
      <div class="sign-in-image-section">
        <img
          src="https://images.unsplash.com/photo-1661341532981-9527197be74c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc0NzI1MTEwMXw&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Civilinc Sign In Image"
          class="sign-in-background-image"
        />
         <div class="image-overlay"></div>
          <div class="image-text">
              <h2>Civilinc</h2>
              <p>Empowering citizens, building better cities.</p>
          </div>
      </div>

      <!-- Sign In Form Section -->
      <div class="sign-in-form-section">
        <div class="sign-in-card-new">
          <div class="sign-in-header-new">
            <h2>Sign In</h2>
            <p>Welcome back! Please enter your details.</p>
          </div>
          <form @submit.prevent="handleSignIn" class="sign-in-form-new">
            <div class="form-group-new">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="email" required placeholder="Enter your email" class="form-input-new">
            </div>
            <div class="form-group-new">
              <div class="password-label-new">
                <label for="password">Password</label>
                <a href="#" class="forgot-password-new">Forgot password?</a>
              </div>
              <input type="password" id="password" v-model="password" required placeholder="Enter your password" class="form-input-new">
            </div>
            <button type="submit" class="sign-in-button-new">Sign In</button>
          </form>
          <div class="divider-new">
            <span>OR</span>
          </div>
          <div class="social-buttons-new">
            <button class="social-button-new facebook-new"><i class="fab fa-facebook-f"></i> Continue with Facebook</button>
            <button class="social-button-new google-new"><i class="fab fa-google"></i> Continue with Google</button>
          </div>
          <div class="signup-link-new">
            Don't have an account? <router-link to="/sign-up">Sign Up</router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'SignIn',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();

    const handleSignIn = () => {
      // Basic authentication logic (replace with actual API call)
      if (email.value === 'test@example.com' && password.value === 'password123') {
        localStorage.setItem('isAuthenticated', 'true');
        // You might want to store user info here too if needed
        // localStorage.setItem('user', JSON.stringify({ email: email.value }));
        router.push('/dashboard'); // Redirect to dashboard on success
      } else {
        alert('Invalid credentials'); // Basic error handling
      }
    };

    return {
      email,
      password,
      handleSignIn
    };
  }
};
</script>

<style scoped>
.sign-in-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f1f5f9; /* Light background */
}

.sign-in-content {
  display: flex;
  width: 100%;
  max-width: 1200px; /* Max width for the entire container */
  min-height: 80vh;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  overflow: hidden; /* Hide overflow for rounded corners */
}

.sign-in-image-section {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.sign-in-background-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the section, may crop */
  display: block;
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top right, rgba(30, 64, 175, 0.7), rgba(59, 130, 246, 0.7)); /* Overlay with gradient */
    z-index: 1;
}

.image-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
    z-index: 2;
}

.image-text h2 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
}

.image-text p {
    font-size: 1.2rem;
    opacity: 0.9;
}

.sign-in-form-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  box-sizing: border-box;
}

.sign-in-card-new {
    width: 100%;
    max-width: 400px; /* Max width for the form content */
    text-align: center;
}

.sign-in-header-new {
  margin-bottom: 2rem;
}

.sign-in-header-new h2 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.sign-in-header-new p {
  font-size: 1rem;
  color: #64748b;
}

.sign-in-form-new {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group-new {
  text-align: left;
}

.form-group-new label {
  display: block;
  font-size: 0.875rem;
  color: #334155;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-input-new {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: #1e293b;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input-new:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.password-label-new {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.forgot-password-new {
  font-size: 0.875rem;
  color: #3b82f6;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-password-new:hover {
  color: #1e40af;
}

.sign-in-button-new {
  width: 100%;
  padding: 1rem;
  background-color: #10b981; /* Green color */
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.sign-in-button-new:hover {
  background-color: #059669; /* Darker green on hover */
}

.divider-new {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
  color: #94a3b8;
}

.divider-new::before,
.divider-new::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #e2e8f0;
}

.divider-new:not(:empty)::before {
  margin-right: .5em;
}

.divider-new:not(:empty)::after {
  margin-left: .5em;
}

.social-buttons-new {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-button-new {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.2s ease;
  background-color: white;
}

.social-button-new i {
    font-size: 1.125rem;
}

.social-button-new.facebook-new {
  color: #3b5998;
  border-color: #3b5998;
}

.social-button-new.facebook-new:hover {
    background-color: #3b5998;
    color: white;
}

.social-button-new.google-new {
  color: #db4437;
  border-color: #db4437;
}

.social-button-new.google-new:hover {
    background-color: #db4437;
    color: white;
}

.signup-link-new {
  font-size: 0.875rem;
  color: #64748b;
}

.signup-link-new a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.signup-link-new a:hover {
  color: #1e40af;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .sign-in-content {
        flex-direction: column; /* Stack image and form */
        min-height: auto;
        border-radius: 1rem;
    }

    .sign-in-image-section {
        height: 250px; /* Smaller height for image on small screens */
    }

    .image-text h2 {
        font-size: 2.5rem;
    }

    .image-text p {
        font-size: 1rem;
    }

    .sign-in-form-section {
        padding: 2rem;
    }

    .sign-in-card-new {
        max-width: 100%;
    }
}

@media (max-width: 480px) {
     .sign-in-form-section {
        padding: 1.5rem;
    }

    .sign-in-card-new {
        padding: 1rem;
    }

    .sign-in-header-new h2 {
        font-size: 1.8rem;
    }

    .sign-in-header-new p {
        font-size: 0.875rem;
    }

    .sign-in-button-new {
        font-size: 1rem;
        padding: 0.75rem;
    }

    .social-button-new {
        font-size: 0.875rem;
        padding: 0.6rem 1rem;
    }
}
</style>
