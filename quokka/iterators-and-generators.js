import { createApp, reactive } from 'petite-vue'
// import { createApp, ref } from 'vue'


console.log("iterators-and-generators.js");

function Title() {
    return {
        init(el) {
            console.log("inner init", this, el);
        },
        title: 'I am some text!!',
        $template: /*html*/`
            <h1>{{ title }}</h1>
            <button @click="store.formWizard.next()">Next!</button>
        `
    }
}

function Test() {
    return {
        init(el) {

        },
        title: 'I am a test!!',
        $template: /*html*/`
            <h1>{{ title }}</h1>
            <button @click="store.formWizard.next()">Onwards!</button>
        `
    }
}


function Fieldset() {
    return {
        $template: /*html*/`
            <div v-if="store.t2" @vue:mounted="init($el)" v-scope="Test()"></div>
            <div v-else-if="store.t1"  @vue:mounted="init($el)" v-scope="Title()"></div>
            <!-- <div @vue:mounted="init($el)" v-html="renderedTemplate"></div> -->
                `
    }
}

const store = reactive({
    init() {
        function* gen(thisArg) {
            console.log("formWizard 1", thisArg);
            yield thisArg.t2 = true;
            console.log("formWizard 2", thisArg);
            yield thisArg.t2 = false;
            // console.log("formWizard", step1);
            // let step2 = yield this.showStep2(step1);
            // console.log("formWizard", step2);
            // let step3 = yield this.showStep3(step2);
            // console.log("formWizard", step3);
            // this.submitFinalData(step3);

        }
        this.formWizard = gen(this);
    },
    t1: true,
    t2: false,
    // *formWizard() {
    //     console.log("formWizard", this.stepsToShow);
    //     let step1 = yield this.showStep1();
    //     console.log("formWizard", step1);
    //     let step2 = yield this.showStep2(step1);
    //     console.log("formWizard", step2);
    //     let step3 = yield this.showStep3(step2);
    //     console.log("formWizard", step3);
    //     this.submitFinalData(step3);

    // },
})

store.init()



createApp({ store, Title, Fieldset, Test }).mount('#root')

