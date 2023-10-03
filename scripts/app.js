import { FormGroup } from "./modules/form_group.js";
import { Modal } from "./modules/modal.js";
import { Toastr } from "./modules/toastr.js";
import { Books } from "./modules/books.js";

/**
 * App
 * Implementation of the Application Class. Initializes all the DOM elements and subscribes
 * to all required events.
 */
class App {
    // The FormGroup Instace
    #form;

    // The Modal Instance
    #modal;

    // The Toastr Instance
    #toastr;

    // The Books Instance
    #books;

    // The element of the spinner
    #spinner_el;


    constructor() {
        // Initialize the Form Group Instance
        this.#form = this.#build_form_group();

        // Initialize the Modal Instance
        this.#modal = new Modal();

        // Initialize the Toastr Instance
        this.#toastr = new Toastr();

        // Initialize the Books Instance
        this.#books = new Books();

        // Subscribe to the click events on the dom
        document.addEventListener( "click", (e) => this.#on_click_event(e) );

        // Initialize the element of the spinner
        this.#spinner_el = document.getElementById("spinner_container");

        // Subscribe to the form submission event and handle it
        this.#form.el.addEventListener("submit", (e) => this.#on_form_submission(e));

        // Initialize the app
        this.#on_init();
    }








    /*******************
     * App Initializer *
     *******************/



    /**
     * Initializes the loading of the app, mainly the Books Module.
     * @returns Promise<void>
     */
    async #on_init() {
        // Display the spinner
        this.#show_spinner();

        // Initialize the books
        try {
            await this.#books.initialize();

            // Finally, hide the spinner
            this.#hide_spinner();
        } catch (e) { this.#toastr.error(e) }
    }











    /******************
     * Event Handlers *
     ******************/





    /**
     * Triggers whenever an element in the dom is clicked.
     * @param e 
     * @returns Promise<void>
     */
    async #on_click_event(e) {
        // Handle a click on the add book button
        if (e.target.id == "add_book_button") {
            this.#form.reset();
            this.#modal.show();
        }

        // Handle a click on a toggle read button
        else if (e.target.id.includes("toggle-read-state")) {
            try {
                await this.#books.toggle_read_state(e.target.id.split("_")[1]);
                this.#toastr.info("The book's read state has been toggled successfully.");
            } catch (e) { this.#toastr.error(e) }
        }

        // Handle a click on a delete button
        else if (e.target.id.includes("delete")) {
            try {
                await this.#books.delete_book(e.target.id.split("_")[1]);
                this.#toastr.success("The book has been deleted successfully.");
            } catch (e) { this.#toastr.error(e) }
        }
    }





    /**
     * Triggers whenever the form is submitted. Handles the creation of a new book.
     * @param e 
     * @returns Promise<void>
     */
    async #on_form_submission(e) {
        // Cancel the default behavior
        e.preventDefault();

        // Trigger the submission if the form is valid
        if (this.#form.valid) {
            try {
                // Set submission state
                this.#form.submission_started();

                // Add the book to the db
                const values = this.#form.build_control_values();
                await this.#books.add_book(values.author, values.name, values.description);

                // Close the dialog and reset the form
                this.#form.submission_ended();
                this.#form.reset();
                this.#modal.close();
            } catch (e) { this.#toastr.error(e) }
        }
    }











    /****************
     * Misc Helpers *
     ****************/





    /**
     * Builds the form group instance for all the book inputs.
     * @returns FormGroup
     */
    #build_form_group() {
        return new FormGroup("form", [
            {
                id: "author", 
                validate_function: (control_values) => {
                    return  typeof control_values["author"] == "string" && 
                            /^[a-zA-Z ]{2,30}$/.test(control_values["author"]);
                }
            },
            {
                id: "name", 
                validate_function: (control_values) => {
                    return  typeof control_values["name"] == "string" && 
                            control_values["name"].length >= 2 && 
                            control_values["name"].length <= 200;
                }
            },
            {
                id: "description", 
                validate_function: (control_values) => {
                    return  typeof control_values["description"] == "string" && 
                            control_values["description"].length >= 10 && 
                            control_values["description"].length <= 500;
                }
            },
        ]);
    }






    /**
     * Shows and hides the spinner accordingly.
     */
    #show_spinner() { this.#spinner_el.style.display = "block" }
    #hide_spinner() { this.#spinner_el.style.display = "none" }
}




/**
 * App Initialization
 * Initializes the Application Instance once the HTML has been loaded.
 * @DONOTMODIFY
 */
const app = new App();