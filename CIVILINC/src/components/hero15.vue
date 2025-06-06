<template>
  <div class="hero15-container1 thq-section-padding">
    <div class="hero15-column">
      <h1 class="hero15-text1 thq-heading-1">
        <slot name="heading11">
          <!--Default content for heading11-->
          <div class="hero15-fragment3">
            <span class="hero15-text6">
              Unifying Urban Departments for Smarter Cities
            </span>
          </div>
        </slot>
      </h1>
      <p class="hero15-text2 thq-body-large">
        <slot name="content1">
          <!--Default content for content1-->
          <div class="hero15-fragment2">
            <span class="hero15-text5">
              Civilinc is a collaborative platform designed to streamline
              communication and coordination between city departments—driving
              efficiency, transparency, and smarter governance.
            </span>
          </div>
        </slot>
      </p>
      <div class="hero15-container2">
        <input
          type="email"
          :placeholder="textinputPlaceholder"
          class="hero15-textinput thq-input"
        />
        <div class="hero15-container3">
          <button class="hero15-button thq-button-filled">
            <span class="thq-body-small">
              <slot name="action3">
                <!--Default content for action3-->
                <div class="hero15-fragment1">
                  <span class="hero15-text4">Sign up now</span>
                </div>
              </slot>
            </span>
          </button>
        </div>
      </div>
    </div>
    <img :alt="image1Alt" :src="image1Src" class="hero15-image" />
    <div class="hero15-container4"></div>
  </div>
</template>

<script>
export default {
  name: 'Hero15',
  props: {
    image1Src: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1530533599658-152cfaf099b6?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDQ4fHxncmVlbiUyMGNpdHl8ZW58MHx8fHwxNzQ3MjI4MDM4fDA&ixlib=rb-4.1.0&h=1100',
    },
    textinputPlaceholder: {
      type: String,
      default: 'Enter your email address',
    },
    image1Alt: {
      type: String,
      default: 'Image of a happy family enjoying a picnic',
    },
  },
}
</script>

<style scoped>
.hero15-container1 {
  width: 100%;
  height: 1015px;
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}
 
.hero15-column {
  gap: 24px;
  left: 81px;
  width: auto;
  bottom: 350px;
  display: flex;
  z-index: 1;
  position: absolute;
  max-width: 560px;
  align-items: flex-start;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
}
 
.hero15-text1 {
  color: #ffffff;
  width: 715px;
  animation-name: slideOutLeft;
  animation-delay: 0s;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
}
 
.hero15-text2 {
  color: #ffffff;
  width: 742px;
  animation-name: fadeInBottomLeft;
  animation-delay: 0s;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 2;
  animation-timing-function: ease-in-out;
}
 
.hero15-container2 {
  gap: var(--dl-layout-space-oneandhalfunits);
  flex: 0 0 auto;
  display: flex;
  align-self: stretch;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
}
 
.hero15-textinput {
  color: #ffffff;
  width: 70%;
  border-color: #ffffff;
  background-color: #ffffff;
}
 
.hero15-container3 {
  flex: 1;
  display: flex;
  align-items: flex-start;
}
 
.hero15-button {
  gap: var(--dl-layout-space-halfunit);
  flex: 1;
  display: flex;
  box-sizing: content-box;
  transition: 0.3s;
  align-items: center;
  border-color: var(--dl-color-theme-primary1);
  border-style: solid;
  border-width: 1px;
  justify-content: center;
  background-color: var(--dl-color-theme-primary1);
}
 
.hero15-button:hover {
  background-color: #046410;
}
 
.hero15-image {
  top: -2px;
  left: -1px;
  width: 100%;
  height: 1021px;
  margin: auto;
  position: absolute;
  object-fit: cover;
}
 
.hero15-container4 {
  flex: 0 0 auto;
  width: auto;
  border: 2px dashed rgba(120, 120, 120, 0.4);
  height: auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
 
.hero15-fragment1 {
  display: contents;
}
 
.hero15-text4 {
  display: inline-block;
}
 
.hero15-fragment2 {
  display: contents;
}
 
.hero15-text5 {
  display: inline-block;
}
 
.hero15-fragment3 {
  display: contents;
}
 
.hero15-text6 {
  display: inline-block;
}
 
@media(max-width: 991px) {
  .hero15-column {
    align-self: center;
  }
}
 
@media(max-width: 767px) {
  .hero15-column {
    width: 100%;
  }
  .hero15-text1 {
    text-align: center;
  }
  .hero15-text2 {
    text-align: center;
  }
  .hero15-container2 {
    flex-direction: column;
  }
  .hero15-textinput {
    width: 100%;
  }
  .hero15-container3 {
    width: 100%;
  }
  .hero15-button {
    width: 100%;
  }
}
 
@media(max-width: 479px) {
  .hero15-container3 {
    width: 100%;
  }
  .hero15-button {
    width: 100%;
  }
}
</style>
