/**
 * Modal
 * The Modal Instance handles the dialog element's functionality.
 */
export class Modal {
    // Element
    #el;

    // Close Button Element
    #close_button_el;


    constructor() {
        // Initialize the Modal Element
        this.#el = document.getElementById("modal");

        // Initialize the Close Button Element and subscribe to its event
        this.#close_button_el = document.getElementById("modal_close_button");
        this.#close_button_el.addEventListener("click", () => { this.close() });
    }




    /**
     * Shows the dialog in modal mode.
     */
    show() { this.#el.showModal() }








    /**
     * Closes the form modal when the user clicks on the button or hits "Escape".
     */
    close() { this.#el.close() }
}