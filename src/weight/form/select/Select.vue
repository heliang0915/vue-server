<template>
    <div class="">
        <select v-model="selectValue" :list="list" @change="selectChange($event)">
            <option :value="item.val" v-for="item in list">
                {{item.txt}}
            </option>
        </select>
    </div>
</template>
<script>
    export default {
        name: "x-select",
        data() {
            return {
                selectValue: this.value
            }
        },
        mounted() {
//            console.log(this.value);
        },
        props: ['value','list'],
        model: {
            prop: 'value'
        },
        methods: {
            selectChange(ev) {
                let val = ev.target.value;
                this.selectValue = val;
                this.$emit('changSelect',val)
            }
        }
    }
</script>