/**
 * Modal
 * The Modal Instance handles the display of the application submission.
 */
export class Modal {
    // Element
    #el;

    // Close Button Element
    #close_button_el;

    // Inner Content Element
    #internal_content_el;


    constructor() {
        // Initialize the Modal Element
        this.#el = document.getElementById("modal");

        // Initialize the Close Button Element and subscribe to its event
        this.#close_button_el = document.getElementById("modal_close_button");
        this.#close_button_el.addEventListener("click", () => { this.#close() });
        document.onkeydown = (evt) => { if (evt.key == "Escape") this.#close() };

        // Initialize the Inner Content Element
        this.#internal_content_el = document.getElementById("modal_internal_content");
    }






    /**
     * Displays the modal once the form is submitted successfully and shows the application
     * summary.
     */
    display(control_values) {
        // Set the application content
        this.#internal_content_el.innerHTML = this.#build_internal_content(control_values);

        // Display the modal
        this.#el.style.display = "block"; 
    }






    /**
     * Builds the HTML string that will be inserted into the modal's internal content.
     * @param {*} control_values 
     * @returns 
     */
    #build_internal_content(control_values) {
        return `
            <div class="row">
                <p>First Name</p>
                <span></span>
                <p class="truncate">${control_values["first_name"]}</p>
            </div>
            <div class="row">
                <p>Last Name</p>
                <span></span>
                <p class="truncate">${control_values["last_name"]}</p>
            </div>
            <div class="row">
                <p>Email</p>
                <span></span>
                <p class="truncate">${control_values["email"]}</p>
            </div>
            <div class="row">
                <p>Phone Number</p>
                <span></span>
                <p class="truncate">${control_values["phone_number"]}</p>
            </div>
        `;
    }







    /**
     * Closes the submission modal when the user clicks on the button or hits "Escape".
     */
    #close() { this.#el.style.display = "none"; }
}