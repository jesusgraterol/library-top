import { FormControl } from "./form_control.js";


/**
 * Form Group
 * The FormGroup instance manages all of the controls and it keeps track of the whole state of 
 * the form.
 */
export class FormGroup {
    // Form & Submit Button Element
    el;
    #submit_button_el;

    // List of FormControl Instances
    controls;

    // The validity state of the form
    valid = false;



    constructor(form_id, partial_controls) {
        // Initialize the element's instance
        this.el = document.getElementById(form_id);
        this.#submit_button_el = document.getElementById("submit_button");


        // Initialize the controls' instances
        this.controls = partial_controls.map((control) => new FormControl(
            control.id, 
            control.validate_function
        ));

        // Subscribe to the input changes
        this.el.addEventListener("input", (e) => this.#on_input_changes(e));
    }






    /**
     * Triggers whenever an input value changes. It validates each control as well as the whole 
     * group and toggles the state of the submit button.
     */
    #on_input_changes(e) {
        // Build the control values
        const control_values = this.build_control_values();

        // Trigger the change event on all controls
        this.controls.forEach((control) => control.on_input_changes(e.target.id, control_values));

        // Update the validity of the form group
        this.valid = this.#is_valid();

        // If the form is valid, enable the submit button. Otherwise, disable it
        if (this.valid) {
            this.#submit_button_el.removeAttribute("disabled", "true");
        } else {
            this.#submit_button_el.setAttribute("disabled", "true");
        }
    }






    /**
     * Builds the control values object for all the registered controls.
     * @returns object {[control_name]: string|number|boolean}
     */
    build_control_values() {
        return this.controls.reduce((accum, current) => {
            accum[current.el.id] = current.el.value;
            return accum;
        }, {});
    }






    /**
     * Checks if all the controls are valid.
     * @returns boolean
     */
    #is_valid() { return this.controls.every((control) => control.valid) }




    /**
     * Resets the value of all the controls as well as their states.
     */
    reset() { 
        this.controls.forEach((control) => control.reset());
        this.#submit_button_el.setAttribute("disabled", "true");
        this.valid = false;
    }
}