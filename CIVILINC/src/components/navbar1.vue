<template>
  <header class="navbar1-container">
    <header data-thq="thq-navbar" class="navbar1-navbar-interactive">
      <svg width="24" height="24" viewBox="0 0 24 24" class="navbar1-icon10">
        <path
          d="M13.5 6L10 18.5m-3.5-10L3 12l3.5 3.5m11-7L21 12l-3.5 3.5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </svg>
      <div data-thq="thq-navbar-nav" class="navbar1-desktop-menu">
        <h1 class="navbar1-text10">
          <slot name="heading">
            <!--Default content for heading-->
            <div class="navbar1-fragment2">
              <span class="navbar1-text15">Civilinc</span>
            </div>
          </slot>
        </h1>
        <nav class="navbar1-links1">
          <a :href="link1Url" class="navbar1-link11 thq-link thq-body-small">
            <slot name="link1">
              <!--Default content for link1-->
              <div><span>Home</span></div>
            </slot>
          </a>
          <a
            :href="link3Url"
            target="_blank"
            rel="noreferrer noopener"
            class="navbar1-link31 thq-link thq-body-small"
          >
            <slot name="link3">
              <!--Default content for link3-->
              <div><span>Impact</span></div>
            </slot>
          </a>
          <a
            :href="link4Url"
            target="_blank"
            rel="noreferrer noopener"
            class="navbar1-link41 thq-link thq-body-small"
          >
            <slot name="link4">
              <!--Default content for link4-->
              <div><span>Contact Us</span></div>
            </slot>
          </a>
        </nav>
        <div class="navbar1-buttons1">
          <button class="navbar1-action11 thq-button-filled thq-button-animated">
            <span>
              <slot name="action1">
                <!--Default content for action1-->
                <div><span>Sign In</span></div>
              </slot>
            </span>
          </button>
        </div>
      </div>
      <div data-thq="thq-burger-menu" class="navbar1-burger-menu">
        <svg viewBox="0 0 1024 1024" class="navbar1-icon12">
          <path
            d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
          ></path>
        </svg>
      </div>
      <div data-thq="thq-mobile-menu" class="navbar1-mobile-menu">
        <div class="navbar1-nav">
          <div class="navbar1-top">
            <img :alt="logoAlt" :src="logoSrc" class="navbar1-logo" />
            <div data-thq="thq-close-menu" class="navbar1-close-menu">
              <svg viewBox="0 0 1024 1024" class="navbar1-icon14">
                <path
                  d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
                ></path>
              </svg>
            </div>
          </div>
          <nav class="navbar1-links2">
            <a :href="link1Url" class="navbar1-link12 thq-link thq-body-small">
              <slot name="link1">
                <!--Default content for link1-->
                <div class="navbar1-fragment7">
                  <span class="navbar1-text20">Home</span>
                </div>
              </slot>
            </a>
            <a :href="link2Url" class="navbar1-link2 thq-link thq-body-small">
              <slot name="link2">
                <!--Default content for link2-->
                <div class="navbar1-fragment8">
                  <span class="navbar1-text21">About Us</span>
                </div>
              </slot>
            </a>
            <a :href="link3Url" class="navbar1-link32 thq-link thq-body-small">
              <slot name="link3">
                <!--Default content for link3-->
                <div class="navbar1-fragment4">
                  <span class="navbar1-text17">Impact</span>
                </div>
              </slot>
            </a>
            <a :href="link4Url" class="navbar1-link42 thq-link thq-body-small">
              <slot name="link4">
                <!--Default content for link4-->
                <div class="navbar1-fragment6">
                  <span class="navbar1-text19">Contact Us</span>
                </div>
              </slot>
            </a>
            <a :href="link5Url" class="navbar1-link5 thq-link thq-body-small">
              <slot name="link5">
                <!--Default content for link5-->
                <div class="navbar1-fragment3">
                  <span class="navbar1-text16">Link5</span>
                </div>
              </slot>
            </a>
          </nav>
          <div class="navbar1-buttons2">
            <button class="thq-button-filled">
              <span>
                <slot name="action1">
                  <!--Default content for action1-->
                  <div class="navbar1-fragment5">
                    <span class="navbar1-text18">Sign In</span>
                  </div>
                </slot>
              </span>
            </button>
            <button class="thq-button-outline">
              <span>
                <slot name="action2">
                  <!--Default content for action2-->
                  <div class="navbar1-fragment1">
                    <span class="navbar1-text14">Action 2</span>
                  </div>
                </slot>
              </span>
            </button>
          </div>
        </div>
        <div class="navbar1-icon-group">
          <svg viewBox="0 0 950.8571428571428 1024" class="thq-icon-x-small">
            <path
              d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"
            ></path></svg
          ><svg viewBox="0 0 877.7142857142857 1024" class="thq-icon-x-small">
            <path
              d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"
            ></path></svg
          ><svg viewBox="0 0 602.2582857142856 1024" class="thq-icon-x-small">
            <path
              d="M548 6.857v150.857h-89.714c-70.286 0-83.429 33.714-83.429 82.286v108h167.429l-22.286 169.143h-145.143v433.714h-174.857v-433.714h-145.714v-169.143h145.714v-124.571c0-144.571 88.571-223.429 217.714-223.429 61.714 0 114.857 4.571 130.286 6.857z"
            ></path>
          </svg>
        </div>
      </div>
    </header>
  </header>
</template>

<script>
export default {
  name: 'Navbar1',
  props: {
    link1Url: {
      type: String,
      default: 'https://www.teleporthq.io',
    },
    link4Url: {
      type: String,
      default: 'https://www.teleporthq.io',
    },
    logoSrc: {
      type: String,
      default:
        'https://aheioqhobo.cloudimg.io/v7/_playground-bucket-v2.teleporthq.io_/84ec08e8-34e9-42c7-9445-d2806d156403/fac575ac-7a41-484f-b7ac-875042de11f8?org_if_sml=1&force_format=original',
    },
    logoAlt: {
      type: String,
      default: 'logo',
    },
    link2Url: {
      type: String,
      default: 'https://www.teleporthq.io',
    },
    link3Url: {
      type: String,
      default: 'https://www.teleporthq.io',
    },
    link5Url: {
      type: String,
      default: 'https://www.teleporthq.io',
    },
  },
}
</script>

<style scoped>
.navbar1-container {
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  background-color: var(--dl-color-theme-neutral-light);
}
 
.navbar1-navbar-interactive {
  width: 100%;
  height: 94px;
  display: flex;
  box-shadow: 5px 5px 10px 0px #ffffff;
  align-items: center;
  padding-top: var(--dl-layout-space-twounits);
  border-color: var(--dl-color-theme-neutral-dark);
  border-width: 1px;
  padding-left: var(--dl-layout-space-threeunits);
  padding-right: var(--dl-layout-space-threeunits);
  padding-bottom: var(--dl-layout-space-twounits);
  justify-content: space-between;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 2px;
}
 
.navbar1-icon10 {
  width: 41px;
  height: 41px;
}
 
.navbar1-desktop-menu {
  flex: 1;
  display: flex;
  position: relative;
  justify-content: space-between;
}
 
.navbar1-text10 {
  top: 0px;
  left: 10px;
  position: absolute;
}
 
.navbar1-links1 {
  gap: var(--dl-layout-space-twounits);
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
 
.navbar1-link11 {
  text-decoration: none;
}
 
.navbar1-link31 {
  text-decoration: none;
}
 
.navbar1-link41 {
  text-decoration: none;
}
 
.navbar1-buttons1 {
  gap: var(--dl-layout-space-twounits);
  display: flex;
  align-items: center;
  flex-direction: row;
}
 
.navbar1-action11 {
  display: flex;
  transition: 0.3s;
  flex-direction: row;
}
 
.navbar1-action11:hover {
  border-color: #054e03;
  background-color: #246202;
}
 
.navbar1-burger-menu {
  display: none;
}
 
.navbar1-icon12 {
  width: var(--dl-layout-size-xsmall);
  height: var(--dl-layout-size-xsmall);
}
 
.navbar1-mobile-menu {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  display: none;
  padding: var(--dl-layout-space-twounits);
  z-index: 100;
  position: absolute;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--dl-color-theme-neutral-light);
}
 
.navbar1-nav {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
 
.navbar1-top {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: var(--dl-layout-space-threeunits);
  justify-content: space-between;
}
 
.navbar1-logo {
  height: 3rem;
}
 
.navbar1-close-menu {
  display: flex;
  align-items: center;
  justify-content: center;
}
 
.navbar1-icon14 {
  width: var(--dl-layout-size-xsmall);
  height: var(--dl-layout-size-xsmall);
}
 
.navbar1-links2 {
  gap: var(--dl-layout-space-unit);
  flex: 0 0 auto;
  display: flex;
  align-self: flex-start;
  align-items: flex-start;
  flex-direction: column;
}
 
.navbar1-link12 {
  text-decoration: none;
}
 
.navbar1-link2 {
  text-decoration: none;
}
 
.navbar1-link32 {
  text-decoration: none;
}
 
.navbar1-link42 {
  text-decoration: none;
}
 
.navbar1-link5 {
  text-decoration: none;
}
 
.navbar1-buttons2 {
  gap: var(--dl-layout-space-twounits);
  display: flex;
  margin-top: var(--dl-layout-space-twounits);
  align-items: center;
  flex-direction: row;
}
 
.navbar1-icon-group {
  gap: var(--dl-layout-space-twounits);
  display: flex;
}
 
.navbar1-fragment1 {
  display: contents;
}
 
.navbar1-text14 {
  display: inline-block;
}
 
.navbar1-fragment2 {
  display: contents;
}
 
.navbar1-text15 {
  display: inline-block;
}
 
.navbar1-fragment3 {
  display: contents;
}
 
.navbar1-text16 {
  display: inline-block;
}
 
.navbar1-fragment4 {
  display: contents;
}
 
.navbar1-text17 {
  display: inline-block;
}
 
.navbar1-fragment5 {
  display: contents;
}
 
.navbar1-text18 {
  display: inline-block;
}
 
.navbar1-fragment6 {
  display: contents;
}
 
.navbar1-text19 {
  display: inline-block;
}
 
.navbar1-fragment7 {
  display: contents;
}
 
.navbar1-text20 {
  display: inline-block;
}
 
.navbar1-fragment8 {
  display: contents;
}
 
.navbar1-text21 {
  display: inline-block;
}
 
@media(max-width: 767px) {
  .navbar1-navbar-interactive {
    padding-left: var(--dl-layout-space-twounits);
    padding-right: var(--dl-layout-space-twounits);
  }
  .navbar1-desktop-menu {
    display: none;
  }
  .navbar1-burger-menu {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
 
@media(max-width: 479px) {
  .navbar1-navbar-interactive {
    padding: var(--dl-layout-space-unit);
    padding-right: 16px;
  }
  .navbar1-mobile-menu {
    padding: var(--dl-layout-space-unit);
  }
}
</style>
