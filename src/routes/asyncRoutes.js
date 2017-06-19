if (typeof require.ensure !== "function") require.ensure = function(d, c) { c(require) };

const indexComponent=  r => require.ensure([], () => r(require('../views/index.vue')), 'indexComponent')
const aboutComponent=  r => require.ensure([], () => r(require('../views/about.vue')), 'aboutComponent')
const linkmeCompoent=  r => require.ensure([], () => r(require('../views/linkme.vue')), 'linkmeCompoent')


export {
    indexComponent,
    aboutComponent,
    linkmeCompoent
}