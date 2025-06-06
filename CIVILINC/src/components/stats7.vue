<template>
  <div class="thq-section-padding">
    <div class="stats7-max-width thq-section-max-width">
      <div class="stats7-container2 thq-flex-row">
        <div class="stats7-container3 thq-card thq-box-shadow"></div>
        <div class="stats7-container4 thq-card thq-box-shadow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stats7',
  props: {},
}
</script>

<style scoped>
.stats7-max-width {
  gap: var(--dl-layout-space-twounits);
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
 
.stats7-container2 {
  width: 100%;
  align-items: center;
  justify-content: center;
}
 
.stats7-container3 {
  width: 30%;
  border: 2px dashed rgba(120, 120, 120, 0.4);
  display: flex;
  align-self: stretch;
  align-items: center;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: column;
  padding-bottom: 0px;
  background-color: var(--dl-color-theme-accent1);
}
 
.stats7-container4 {
  width: 30%;
  border: 2px dashed rgba(120, 120, 120, 0.4);
  display: flex;
  align-self: stretch;
  align-items: center;
  padding-top: 0px;
  padding-left: 0px;
  padding-right: 0px;
  flex-direction: column;
  padding-bottom: 0px;
  background-color: #ffffff;
}
 
@media(max-width: 991px) {
  .stats7-container2 {
    flex-direction: column;
  }
  .stats7-container3 {
    width: 100%;
  }
  .stats7-container4 {
    width: 100%;
  }
}
 
@media(max-width: 479px) {
  .stats7-container2 {
    align-items: center;
    flex-direction: column;
  }
}
</style>
