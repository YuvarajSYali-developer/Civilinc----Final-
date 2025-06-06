<template>
  <div class="sign-in-wrapper-new">
    <div class="sign-in-container-new">
      <!-- Image Section -->
      <div class="sign-in-image-section-new">
        <div class="brand-section-new">
          <span class="brand-text-new"><span class="code-brackets-new">&lt;/&gt;</span> Civilinc</span>
        </div>
        <!-- Existing Image -->
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Smart City"
          class="background-image-new"
        />
        <div class="image-overlay-new"></div>
        <div class="image-text-new">
            <h2>Building Smarter Cities Together</h2>
            <p>Access your dashboard to manage projects, complaints, and data.</p>
        </div>
      </div>

      <!-- Sign In Form Section -->
      <div class="sign-in-form-section-new">
         <router-link to="/" class="back-to-home-new">
            <svg viewBox="0 0 24 24" class="back-icon-new">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Back to Home
          </router-link>
        <div class="sign-in-content-new">
          <h1 class="sign-in-title-new">Welcome Back</h1>
          <p class="sign-in-subtitle-new">Sign in to continue to Civilinc</p>
          
          <form @submit.prevent="handleSignIn" class="sign-in-form-main-new">
            <div class="form-group-new">
              <label for="email-new">Email</label>
              <input
                type="email"
                id="email-new"
                v-model="email"
                @blur="validateEmail"
                :class="{ error: emailError }"
                placeholder="Enter your email"
                required
                class="form-input-new"
              />
              <span v-if="emailError" class="error-message-new">{{ emailError }}</span>
            </div>
            
            <div class="form-group-new">
              <label for="password-new">Password</label>
              <div class="password-input-new">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password-new"
                  v-model="password"
                  @blur="validatePassword"
                  :class="{ error: passwordError }"
                  placeholder="Enter your password"
                  required
                  class="form-input-new"
                />
                <button
                  type="button"
                  class="toggle-password-new"
                  @click="togglePassword"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <span v-if="passwordError" class="error-message-new">{{ passwordError }}</span>
            </div>
            
            <div class="form-options-new">
              <label class="remember-me-new">
                <input type="checkbox" v-model="rememberMe" />
                <span>Remember me</span>
              </label>
              <button type="button" class="forgot-password-button-new" @click="handleForgotPassword">
                Forgot password?
              </button>
            </div>
            
            <button
              type="submit"
              class="sign-in-button-submit-new"
              :disabled="!isFormValid || isLoading"
              :class="{ loading: isLoading }"
            >
              <span v-if="isLoading">Signing in...</span>
              <span v-else>Sign In</span>
            </button>
          </form>
          
          <div class="divider-new">
            <span>or continue with</span>
          </div>
          
          <div class="social-login-new">
            <button 
              class="social-button-new google-new" 
              @click="handleGoogleSignIn"
              :disabled="isLoading"
            >
              <svg viewBox="0 0 24 24" class="social-icon-new">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button 
              class="social-button-new facebook-new" 
              @click="handleFacebookSignIn"
              :disabled="isLoading"
            >
              <svg viewBox="0 0 24 24" class="social-icon-new">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
          <div class="signup-text-new">
              Don't have an account? <router-link to="/sign-up" class="signup-link-new">Sign Up</router-link>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      isLoading: false,
      emailError: '',
      passwordError: ''
    }
  },
  computed: {
    isFormValid() {
      return this.email && this.password && !this.emailError && !this.passwordError
    }
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.email) {
        this.emailError = 'Email is required'
      } else if (!emailRegex.test(this.email)) {
        this.emailError = 'Please enter a valid email address'
      } else {
        this.emailError = ''
      }
    },
    validatePassword() {
      if (!this.password) {
        this.passwordError = 'Password is required'
      } else if (this.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters'
      } else {
        this.passwordError = ''
      }
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    handleSignIn() {
      // Validate form
      this.validateEmail()
      this.validatePassword()
      
      if (!this.isFormValid) {
        return
      }

      // Show loading state
      this.isLoading = true

      // Check for specific credentials
      if (this.email === 'yuvarajyali@gmail.com' && this.password === 'yuvarajyali@gmail.com') {
        // Store user session
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify({
          email: this.email,
          name: 'Yuvaraj Yali'
        }))

        // Navigate to dashboard
        this.$router.push('/dashboard')
      } else {
        // Show error for invalid credentials
        this.emailError = 'Invalid email or password'
        this.passwordError = 'Invalid email or password'
      }
      
      // Reset loading state
      this.isLoading = false
    },
    handleGoogleSignIn() {
      // Implement Google sign-in
      console.log('Google sign-in clicked')
    },
    handleFacebookSignIn() {
      // Implement Facebook sign-in
      console.log('Facebook sign-in clicked')
    },
    handleForgotPassword() {
      // Implement forgot password functionality
      console.log('Forgot password clicked')
    }
  }
}
</script>

<style scoped>
.sign-in-wrapper-new {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* Added subtle background pattern/effect */
  background-color: #f1f5f9; /* Light background */
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zm10 28c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-10 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-10 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0-20c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-10 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0-20c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-10 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm0-20c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm-10 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zM6 54v-4H4v4H0v2h4v4h2v-4h4v-2H6zm0-10V40H4v4H0v2h4v4h2v-4h4v-2H6z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  padding: 2rem;
  box-sizing: border-box;
}

.sign-in-container-new {
  display: flex;
  width: 100%;
  max-width: 1200px; /* Max width for the entire container */
  min-height: 80vh;
  background-color: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
  overflow: hidden; /* Hide overflow for rounded corners */
}

.sign-in-image-section-new {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  box-sizing: border-box;
}

.brand-section-new {
    position: relative;
    z-index: 2;
    text-align: left;
}

.brand-text-new {
    font-size: 1.8rem;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
}

.code-brackets-new {
    color: white;
    font-family: 'Fira Code', monospace;
    font-size: 1.6rem;
    opacity: 0.9;
}

.background-image-new {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: 0;
}

.image-overlay-new {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* Removed blue gradient */
    background: rgba(0, 0, 0, 0.3); /* Subtle dark overlay */
    z-index: 1;
}

.image-text-new {
    position: relative;
    z-index: 2;
    color: white;
    text-align: center;
    margin-top: auto;
}

.image-text-new h2 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
    text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
}

.image-text-new p {
    font-size: 1.1rem;
    opacity: 0.95;
     text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.sign-in-form-section-new {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  box-sizing: border-box;
  position: relative;
}

.back-to-home-new {
    position: absolute;
    top: 2rem;
    left: 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: #475569;
    font-size: 0.9rem;
    transition: color 0.2s ease;
}

.back-to-home-new:hover {
    color: #1e293b;
}

.back-icon-new {
    width: 16px;
    height: 16px;
    fill: #475569;
    transition: fill 0.2s ease;
}

.back-to-home-new:hover .back-icon-new {
    fill: #1e293b;
}

.sign-in-content-new {
    width: 100%;
    max-width: 400px;
    text-align: center;
    margin-top: 2rem;
}

.sign-in-header-new {
  margin-bottom: 2rem;
}

.sign-in-header-new h1,
.sign-in-header-new h2 {
  font-size: 2rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.sign-in-subtitle-new {
  font-size: 1rem;
  color: #64748b;
}

.sign-in-form-main-new {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-group-new {
  text-align: left;
  position: relative;
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

.form-input-new.error {
    border-color: #ef4444;
}

.error-message-new {
    font-size: 0.75rem;
    color: #ef4444;
    margin-top: 0.25rem;
    display: block;
}

.password-input-new {
    position: relative;
}

.password-input-new input {
    padding-right: 2.5rem;
}

.toggle-password-new {
    position: absolute;
    top: 50%;
    right: 0.75rem;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #94a3b8;
    transition: color 0.2s ease;
}

.toggle-password-new:hover {
    color: #475569;
}

.form-options-new {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #64748b;
}

.remember-me-new {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
}

.remember-me-new input[type="checkbox"] {
    /* basic checkbox styling, could be enhanced */
}

.forgot-password-button-new {
  background: none;
  border: none;
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.forgot-password-button-new:hover {
  color: #1e40af;
}

.sign-in-button-submit-new {
  width: 100%;
  padding: 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.sign-in-button-submit-new:hover:not(:disabled) {
  background-color: #059669;
}

.sign-in-button-submit-new:disabled {
    background-color: #a3b1bf;
    cursor: not-allowed;
}

.divider-new {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
  color: #94a3b8;
  font-size: 0.875rem;
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

.social-login-new {
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

.social-button-new i,
.social-button-new svg {
    font-size: 1.125rem;
    width: 1.125rem;
    height: 1.125rem;
}

.social-button-new.google-new {
  color: #db4437;
  border-color: #db4437;
}

.social-button-new.google-new:hover:not(:disabled) {
    background-color: #db4437;
    color: white;
}

.social-button-new.facebook-new {
  color: #3b5998;
  border-color: #3b5998;
}

.social-button-new.facebook-new:hover:not(:disabled) {
    background-color: #3b5998;
    color: white;
}

.social-button-new:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.signup-text-new {
  font-size: 0.875rem;
  color: #64748b;
}

.signup-link-new {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.signup-link-new:hover {
  color: #1e40af;
}

/* Responsive adjustments */
@media (max-width: 991px) {
     .sign-in-container-new {
        flex-direction: column;
        min-height: auto;
        border-radius: 1rem;
        max-width: 600px;
    }

    .sign-in-image-section-new {
        height: 250px;
        padding: 1.5rem;
    }

    .brand-text-new {
        font-size: 1.5rem;
    }

    .image-text-new h2 {
        font-size: 2rem;
    }

    .image-text-new p {
        font-size: 1rem;
    }

    .sign-in-form-section-new {
        padding: 2rem;
    }

    .sign-in-content-new {
        max-width: 100%;
         margin-top: 0;
    }

     .back-to-home-new {
        position: relative;
        top: auto;
        left: auto;
        margin-bottom: 1.5rem;
        justify-content: center;
    }
}

@media (max-width: 480px) {
     .sign-in-container-new {
        padding: 1rem;
    }

     .sign-in-image-section-new {
        height: 200px;
        padding: 1rem;
    }

    .brand-text-new {
        font-size: 1.3rem;
    }

    .image-text-new h2 {
        font-size: 1.8rem;
    }

    .image-text-new p {
        font-size: 0.9rem;
    }

     .sign-in-form-section-new {
        padding: 1.5rem;
    }

    .sign-in-content-new {
        padding: 1rem;
    }

    .sign-in-header-new h1, .sign-in-header-new h2 {
        font-size: 1.5rem;
    }

     .sign-in-subtitle-new {
        font-size: 0.9rem;
    }

     .sign-in-form-main-new {
        gap: 1rem;
        margin-bottom: 1rem;
    }

    .form-group-new label {
        font-size: 0.8rem;
    }

    .form-input-new {
        padding: 0.6rem 0.8rem;
        font-size: 0.9rem;
    }

    .toggle-password-new {
        right: 0.5rem;
    }

    .form-options-new {
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
    }

    .sign-in-button-submit-new {
        font-size: 1rem;
        padding: 0.8rem;
    }

    .divider-new {
        margin: 1.5rem 0;
    }

    .social-login-new {
        gap: 0.8rem;
        margin-bottom: 1rem;
    }

    .social-button-new i, .social-button-new svg {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
    }

    .signup-text-new {
        font-size: 0.8rem;
    }
}

</style>
