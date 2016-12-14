<template>
<span class="tip" @mouseover="show=true" @mouseout="show=false">
  <i class="fa fa-question-circle-o">
    <div class="tip-wrap" v-show="show" :class="pos" :style="{'width': width}">
      {{tip}}
    </div>
  </i>
</span>
</template>

<script>
    export default {
      name: 'v-tip',
        props: {
            tip: {
                default: ''                  //提示信息
            },
            pos: {
                default: 'right'               //默认位置
            },
            width: {
                default: '250px'    //提示框宽度
            }
        },
        data() {
            return {
                show: false
            }
        }
    }
</script>
