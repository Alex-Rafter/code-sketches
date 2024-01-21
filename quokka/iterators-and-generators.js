import { h } from "preact";
import htm from "htm";
import register from "preact-custom-element";
const html = htm.bind(h);


export function Fieldset({ title }) {
    const state = {
        1: false,
        2: false,
        3: false
    }

    function* formWizard() {
        let step1 = yield showStep1();
        let step2 = yield showStep2(step1);
        let step3 = yield showStep3(step2);
        submitFinalData(step3);
    }

    const wizard = formWizard();
    wizard.next();

    function nextStep() {
        wizard.next();
    }
    function showStep1() {

        this.setState({ [1]: true })
        console.log("showStep1", stepsToShow);
    }
    function showStep2() {
        this.setState({ [2]: true })
        console.log("showStep2", stepsToShow);
    }
    function showStep3() {
        this.setState({ [3]: true })
        console.log("showStep3", stepsToShow);
    }
    function submitFinalData() {
        console.log("submitFinalData", stepsToShow);
    }
    return html`
    <style>
        .red {
            color: red;
        }
    </style>
    <fieldset>
        <legend class=${stepsToShow[2] && 'red'}>${title}</legend>
        <input type="text" name="name" />
        <button onClick=${nextStep}>Next</button>
    </fieldset>
  `;
}

register(Fieldset, "ar-fieldset", ["name"], { shadow: true });
