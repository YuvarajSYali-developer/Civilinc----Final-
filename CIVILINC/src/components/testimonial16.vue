<template>
  <div class="testimonial16-testimonial13 thq-section-padding">
    <div class="testimonial16-max-width thq-section-max-width">
      <div class="testimonial16-container1">
        <h2 class="testimonial16-text10 thq-heading-2">
          <slot name="heading1">
            <!--Default content for heading1-->
            <div class="testimonial16-fragment5">
              <span class="testimonial16-text23">Testimonials</span>
            </div>
          </slot>
        </h2>
      </div>
    </div>
    <div class="thq-grid-2">
      <div class="testimonial16-container3 thq-card">
        <img :alt="imageAlt" :src="imageSrc" class="testimonial16-image1" />
        <h1 class="testimonial16-text11">
          <slot name="heading">
            <!--Default content for heading-->
            <div class="testimonial16-fragment4">
              <span class="testimonial16-text20">
                <span>
                  Charulatha Somal
                  <span v-html="rawotw8"></span>
                </span>
                <span class="testimonial16-text22">IAS</span>
              </span>
            </div>
          </slot>
        </h1>
        <span class="testimonial16-text12">
          <slot name="text1">
            <!--Default content for text1-->
            <div class="testimonial16-fragment3">
              <span class="testimonial16-text19">
                          The project, Citilinc, developed by Yuvaraj Yali, a
                student of MIT         Manipal, Udupi, Karnataka, is a digital
                platform for inter-departmental   cooperation designed to enhance
                coordination among urban   governance departments. I believe this
                platform has the potential to   significantly improve urban
                governance by ensuring more efficient     project execution,
                minimizing delays, and enhancing inter-     departmental
                collaboration. I highly recommend considering its adoption to
                support sustainable and inclusive development across Indian
                cities.
              </span>
            </div>
          </slot>
        </span>
      </div>
      <div class="testimonial16-container4 thq-card">
        <h1 class="testimonial16-text13">
          <slot name="heading2">
            <!--Default content for heading2-->
            <div class="testimonial16-fragment1">
              <span class="testimonial16-text15">
                <span>
                  Chidanand Vatare
                  <span v-html="rawwk7g"></span>
                </span>
                <span class="testimonial16-text17">KAS</span>
              </span>
            </div>
          </slot>
        </h1>
        <img :alt="imageAlt1" :src="imageSrc1" class="testimonial16-image2" />
        <div class="testimonial16-container5">
          <div class="testimonial16-container6"></div>
        </div>
        <span class="testimonial16-text14">
          <slot name="text11">
            <!--Default content for text11-->
            <div class="testimonial16-fragment2">
              <span class="testimonial16-text18">
                The Digital Platform for Inter-Departmental Cooperation, Civilinc,
                developed by Yuvaraj S. Yali, a 2nd-year B.Tech Electronics and
                Communication student at MIT Manipal, Udupi, Karnataka, is an
                innovative solution designed to improve coordination among urban
                governance departments. This platform could have greatly benefited
                the Shimoga Smart City project by optimizing resource utilization,
                enhancing data sharing, and streamlining project
                execution—critical areas where challenges were faced. Its ability
                to promote transparency and public engagement makes it a valuable
                tool for any city administration. I see immense potential in this
                platform to support effective and timely project delivery, reduce
                delays, and improve collaboration across departments. I highly
                recommend its implementation to foster better urban governance and
                sustainable development.
              </span>
            </div>
          </slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Testimonial16',
  props: {
    imageSrc1: {
      type: String,
      default: '/chidanand-vatare-2-200h.jpg',
    },
    imageSrc: {
      type: String,
      default: '/charulatha-photo-200h.png',
    },
    imageAlt: {
      type: String,
      default: 'image',
    },
    imageAlt1: {
      type: String,
      default: 'image',
    },
  },
  data() {
    return {
      rawx9si: ' ',
      rawb9p6: ' ',
      rawotw8: ' ',
      rawwk7g: ' ',
    }
  },
}
</script>

<style scoped>
.testimonial16-testimonial13 {
  box-shadow: 5px 5px 10px 0px #d4d4d4;
  border-color: #ffffff;
  border-style: solid;
  border-width: 3px;
  background-size: cover;
  background-image: url("https://images.unsplash.com/photo-1530533599658-152cfaf099b6?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDQ4fHxncmVlbiUyMGNpdHl8ZW58MHx8fHwxNzQ3MjI4MDM4fDA&ixlib=rb-4.1.0&w=1500");
  border-top-width: 1px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
}
 
.testimonial16-max-width {
  display: flex;
  align-items: center;
  flex-direction: column;
}
 
.testimonial16-container1 {
  gap: var(--dl-layout-space-unit);
  display: flex;
  max-width: 600px;
  align-items: center;
  margin-bottom: var(--dl-layout-space-fourunits);
  flex-direction: column;
}
 
.testimonial16-text10 {
  width: 292px;
  font-size: 50px;
  box-shadow: 0px 0px 0px 0px #ffffff;
  animation-name: none;
  animation-delay: 0s;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.testimonial16-container3 {
  flex: 1;
  width: 494px;
  height: 451px;
  display: flex;
  position: relative;
  align-self: flex-start;
  align-items: flex-start;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: column;
  padding-bottom: 0px;
  justify-content: center;
}
 
.testimonial16-image1 {
  top: -21px;
  left: 174px;
  width: 148px;
  height: 145px;
  position: absolute;
  box-shadow: 0px 0px 0px 0px #ffffff;
  object-fit: cover;
  border-color: var(--dl-color-theme-neutral-dark);
  border-width: 2px;
  border-radius: var(--dl-layout-radius-round);
  animation-name: none;
  animation-delay: 0s;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.testimonial16-text11 {
  top: 135px;
  left: 87px;
  color: #020202;
  opacity: 0.8;
  position: absolute;
  box-shadow: 0px 0px 0px 0px #ffffff;
  animation-name: none;
  animation-delay: 0s;
  background-color: #ffffff;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.testimonial16-text12 {
  top: 190px;
  left: -46px;
  color: #000000;
  opacity: 0.5;
  position: absolute;
  box-shadow: 0px 0px 0px 0px #ffffff;
  line-height: 1.5;
  border-color: var(--dl-color-theme-neutral-dark);
  border-width: 1px;
  border-radius: var(--dl-layout-radius-inputradius);
  animation-name: none;
  animation-delay: 0s;
  background-color: #ffffff;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.testimonial16-container4 {
  flex: 1;
  width: 507px;
  height: 460px;
  display: flex;
  position: relative;
  align-self: flex-start;
  align-items: flex-start;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: column;
  padding-bottom: 0px;
  justify-content: center;
}
 
.testimonial16-text13 {
  top: 136px;
  left: 114px;
  color: #000000;
  opacity: 0.8;
  position: absolute;
  box-shadow: 0px 0px 0px 0px #ffffff;
  border-radius: var(--dl-layout-radius-buttonradius);
  animation-name: none;
  animation-delay: 0s;
  background-color: #D9D9D9;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.testimonial16-image2 {
  top: -15px;
  left: 162px;
  width: 151px;
  height: 138px;
  position: absolute;
  box-shadow: 0px 0px 0px 0px #ffffff;
  object-fit: cover;
  border-color: var(--dl-color-theme-neutral-dark);
  border-width: 2px;
  border-radius: var(--dl-layout-radius-round);
  animation-name: none;
  animation-delay: 0s;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.testimonial16-container5 {
  gap: var(--dl-layout-space-unit);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
 
.testimonial16-container6 {
  border: 2px dashed rgba(120, 120, 120, 0.4);
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}
 
.testimonial16-text14 {
  left: -11px;
  color: #000000;
  bottom: 35px;
  opacity: 0.5;
  position: absolute;
  box-shadow: 0px 0px 0px 0px #ffffff;
  line-height: 1.5;
  border-radius: var(--dl-layout-radius-buttonradius);
  animation-name: none;
  animation-delay: 0s;
  background-color: #D9D9D9;
  animation-duration: 300ms;
  animation-direction: normal;
  animation-iteration-count: 1;
  animation-timing-function: ease;
}
 
.testimonial16-fragment1 {
  display: contents;
}
 
.testimonial16-text15 {
  display: inline-block;
}
 
.testimonial16-text17 {
  font-size: 18px;
}
 
.testimonial16-fragment2 {
  display: contents;
}
 
.testimonial16-text18 {
  display: inline-block;
  font-size: 13px;
  font-style: normal;
  font-weight: 900;
}
 
.testimonial16-fragment3 {
  display: contents;
}
 
.testimonial16-text19 {
  display: inline-block;
  font-size: 15px;
  font-style: normal;
  font-weight: 900;
}
 
.testimonial16-fragment4 {
  display: contents;
}
 
.testimonial16-text20 {
  display: inline-block;
}
 
.testimonial16-text22 {
  font-size: 18px;
}
 
.testimonial16-fragment5 {
  display: contents;
}
 
.testimonial16-text23 {
  color: #fdfdfd;
  display: inline-block;
}
 
@media(max-width: 991px) {
  .testimonial16-container1 {
    margin-bottom: var(--dl-layout-space-threeunits);
  }
}
 
@media(max-width: 767px) {
  .testimonial16-container1 {
    margin-bottom: var(--dl-layout-space-oneandhalfunits);
  }
  .testimonial16-container3 {
    width: 100%;
  }
  .testimonial16-container4 {
    width: 100%;
  }
}
</style>
