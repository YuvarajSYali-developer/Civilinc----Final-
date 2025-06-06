<template>
  <div
    class="contact3-contact20 thq-section-padding"
    v-bind:class="rootClassName"
  >
    <div class="contact3-max-width thq-section-max-width">
      <div class="contact3-section-title">
        <div class="contact3-content1">
          <h2 class="contact3-text10 thq-heading-2">
            <slot name="heading1">
              <!--Default content for heading1-->
              <div class="contact3-fragment6">
                <span class="contact3-text21">Contact Us</span>
              </div>
            </slot>
          </h2>
          <p class="contact3-text11 thq-body-large">
            <slot name="content1">
              <!--Default content for content1-->
              <div class="contact3-fragment4">
                <span class="contact3-text19">
                  Have questions or want to learn more about Civilinc? Reach out
                  to us using the contact information below.
                </span>
              </div>
            </slot>
          </p>
        </div>
      </div>
      <div class="contact3-row">
        <div class="contact3-content2">
          <svg viewBox="0 0 1024 1024" class="contact3-icon1 thq-icon-medium">
            <path
              d="M854 342v-86l-342 214-342-214v86l342 212zM854 170q34 0 59 26t25 60v512q0 34-25 60t-59 26h-684q-34 0-59-26t-25-60v-512q0-34 25-60t59-26h684z"
            ></path>
          </svg>
          <div class="contact3-contact-info">
            <div class="contact3-content3">
              <h3 class="contact3-text12 thq-heading-3">Email</h3>
            </div>
            <span class="contact3-email thq-body-small">
              <slot name="email1">
                <!--Default content for email1-->
                <div class="contact3-fragment2">
                  <span class="contact3-text17">info@civilinc.com</span>
                </div>
              </slot>
            </span>
          </div>
          <p class="contact3-text13 thq-body-large">
            <slot name="content3">
              <!--Default content for content3-->
              <div class="contact3-fragment1">
                <span class="contact3-text16">
                  Stay connected with us for updates and news.
                </span>
              </div>
            </slot>
          </p>
        </div>
        <div class="contact3-content4">
          <svg viewBox="0 0 1024 1024" class="contact3-icon3 thq-icon-medium">
            <path
              d="M282 460q96 186 282 282l94-94q20-20 44-10 72 24 152 24 18 0 30 12t12 30v150q0 18-12 30t-30 12q-300 0-513-213t-213-513q0-18 12-30t30-12h150q18 0 30 12t12 30q0 80 24 152 8 26-10 44z"
            ></path>
          </svg>
          <h3 class="contact3-text14 thq-heading-3">Phone</h3>
          <p class="contact3-text15 thq-body-large">
            <slot name="content4">
              <!--Default content for content4-->
              <div class="contact3-fragment5">
                <span class="contact3-text20">You can call me !!</span>
              </div>
            </slot>
          </p>
          <span class="contact3-phone thq-body-small">
            <slot name="phone1">
              <!--Default content for phone1-->
              <div class="contact3-fragment3">
                <span class="contact3-text18">+91-8431751433</span>
              </div>
            </slot>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact3',
  props: {
    rootClassName: String,
  },
}
</script>

<style scoped>
.contact3-contact20 {
  display: flex;
  overflow: hidden;
  position: relative;
  box-shadow: 5px 5px 10px 0px #d4d4d4;
  align-items: center;
  border-color: #ffffff;
  border-width: 1px;
  flex-direction: column;
  background-size: cover;
  background-image: url("https://images.unsplash.com/photo-1530533599658-152cfaf099b6?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDQ4fHxncmVlbiUyMGNpdHl8ZW58MHx8fHwxNzQ3MjI4MDM4fDA&ixlib=rb-4.1.0&w=1500");
}
 
.contact3-max-width {
  gap: var(--dl-layout-space-twounits);
  display: flex;
  align-items: center;
  flex-direction: column;
}
 
.contact3-section-title {
  gap: var(--dl-layout-space-unit);
  width: auto;
  display: flex;
  max-width: 800px;
  align-items: center;
  flex-shrink: 0;
  flex-direction: column;
}
 
.contact3-content1 {
  gap: var(--dl-layout-space-oneandhalfunits);
  display: flex;
  align-self: stretch;
  align-items: center;
  flex-direction: column;
}
 
.contact3-text10 {
  animation-name: pulse;
  animation-delay: 0s;
  animation-duration: 500ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.contact3-text11 {
  color: #ffffff;
  text-align: center;
  animation-name: none;
  animation-delay: 0s;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.contact3-row {
  gap: var(--dl-layout-space-threeunits);
  display: flex;
  position: relative;
  align-self: stretch;
  align-items: flex-start;
}
 
.contact3-content2 {
  gap: var(--dl-layout-space-oneandhalfunits);
  flex: 1;
  width: 523px;
  height: 146px;
  display: flex;
  position: relative;
  align-items: center;
  padding-right: 522px;
  flex-direction: column;
}
 
.contact3-icon1 {
  fill: #ffffff;
  animation-name: none;
  animation-delay: 0s;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.contact3-contact-info {
  gap: var(--dl-layout-space-oneandhalfunits);
  display: flex;
  position: relative;
  align-self: stretch;
  align-items: center;
  flex-direction: column;
}
 
.contact3-content3 {
  gap: var(--dl-layout-space-unit);
  display: flex;
  position: relative;
  align-self: stretch;
  align-items: stretch;
  flex-direction: column;
}
 
.contact3-text12 {
  top: -20px;
  left: 177px;
  color: #000000;
  width: 84px;
  position: absolute;
  align-self: stretch;
  text-align: center;
  animation-name: none;
  animation-delay: 0s;
  background-color: #D9D9D9;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.contact3-email {
  left: 152px;
  color: #000000;
  bottom: -92px;
  position: absolute;
  text-align: center;
  animation-name: none;
  animation-delay: 0s;
  background-color: #D9D9D9;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.contact3-text13 {
  left: 34px;
  color: #000000;
  bottom: 16px;
  position: absolute;
  text-align: center;
  animation-name: none;
  animation-delay: 0s;
  background-color: #D9D9D9;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.contact3-content4 {
  gap: var(--dl-layout-space-oneandhalfunits);
  top: 1px;
  flex: 1;
  right: -164px;
  width: 669px;
  height: 124px;
  display: flex;
  position: absolute;
  align-items: center;
  flex-direction: column;
}
 
.contact3-icon3 {
  fill: #fdfafa;
  animation-name: none;
  animation-delay: 0s;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.contact3-text14 {
  top: 64px;
  left: 296px;
  color: #040404;
  position: absolute;
  align-self: stretch;
  text-align: center;
  animation-name: none;
  animation-delay: 0s;
  background-color: #D9D9D9;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.contact3-text15 {
  left: 260px;
  color: #000000;
  bottom: -17px;
  position: absolute;
  text-align: center;
  animation-name: none;
  animation-delay: 0s;
  background-color: #D9D9D9;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.contact3-phone {
  left: 274px;
  color: #000000;
  bottom: -47px;
  position: absolute;
  text-align: center;
  animation-name: none;
  animation-delay: 0s;
  background-color: #D9D9D9;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.contact3-fragment1 {
  display: contents;
}
 
.contact3-text16 {
  display: inline-block;
}
 
.contact3-fragment2 {
  display: contents;
}
 
.contact3-text17 {
  display: inline-block;
}
 
.contact3-fragment3 {
  display: contents;
}
 
.contact3-text18 {
  display: inline-block;
}
 
.contact3-fragment4 {
  display: contents;
}
 
.contact3-text19 {
  display: inline-block;
}
 
.contact3-fragment5 {
  display: contents;
}
 
.contact3-text20 {
  display: inline-block;
}
 
.contact3-fragment6 {
  display: contents;
}
 
.contact3-text21 {
  color: #ffffff;
  display: inline-block;
}
 
.contact3root-class-name {
  background-size: cover;
  background-image: url("https://images.unsplash.com/photo-1530533599658-152cfaf099b6?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDQ4fHxncmVlbiUyMGNpdHl8ZW58MHx8fHwxNzQ3MjI4MDM4fDA&ixlib=rb-4.1.0&w=1500");
}
 
@media(max-width: 767px) {
  .contact3-row {
    flex-direction: column;
  }
}
 
@media(max-width: 479px) {
  .contact3-row {
    align-items: stretch;
  }
}
</style>
