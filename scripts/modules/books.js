/**
 * Books
 * The Books Instance handles the display and storage of books. As well as the state updates.
 */
export class Books {
    // Books Database
    #db;

    // The element of the no data found text
    #no_data_found_el;

    // The element of the main container
    #main_el;
    


    constructor() {
        // Initialize the no data text element
        this.#no_data_found_el = document.getElementById("no_data_found");

        // Initialize the main container's element
        this.#main_el = document.getElementById("main");
    }






    /***************
     * Initializer *
     ***************/




    /**
     * Retrieves the books from the database and renders them.
     * @returns Promise<void>
     */
    async initialize() {
        // @DEPRECATE THIS DELAY WHEN A PROPER DB IS IMPLEMENTED
        await this.#delay();

        // Initialize the database
        this.#db = {};

        // Render the books
        this.#render();
    }







    /********************
     * Books Management *
     ********************/





    /**
     * Retrieves a book from the local database. Note that if the book does not exist, throws an error.
     * @param id 
     * @returns object
     */
    get_book(id) {
        // Make sure the book exists
        if (!this.#db[id]) throw new Error(`The book ${id} was not found in the database.`);

        // Finally, return the book
        return this.#db[id];
    }





    /**
     * Adds a new book to the database and returns the ID.
     * @param author 
     * @param name 
     * @param description 
     * @returns Promise<string>
     */
    async add_book(author, name, description) {
        // @DEPRECATE THIS DELAY WHEN A PROPER DB IS IMPLEMENTED
        await this.#delay();

        // Generate the book's id
        const id = this.#generate_id();

        // Store the book in the db
        this.#db[id] = {
            id: id,
            author: author,
            name: name,
            description: description,
            read: false
        };


        // Render the view and return the book's id
        this.#render();
        return id;
    }








    /**
     * Marks a book as read based on its id.
     * @param id 
     * @returns Promise<void>
     */
    async toggle_read_state(id) {
        // Make sure the book exists
        if (!this.#db[id]) throw new Error(`The book ${id} was not found in the database.`);

        // Set the read property
        this.#db[id].read = !this.#db[id].read;

        // Render the view
        this.#render();
    }





    /**
     * Deletes a book from the database.
     * @param id 
     * @returns Promise<void>
     */
    async delete_book(id) {
        // Make sure the book exists
        if (!this.#db[id]) throw new Error(`The book ${id} was not found in the database.`);

        // Delete the book from the db
        delete this.#db[id];

        // Render the view
        this.#render();
    }













    /*******************
     * Books' Renderer *
     *******************/





    /**
     * Renders all the books stored in the db. If no books are found, it renders a message.
     */
    #render() {
        // Initialize the main content
        let content = "";
        
        // Init the list of books and sort them by name
        let books = Object.values(this.#db);
        books.sort((a, b) => a.name < b.name ? -1: 1);

        // Iterate over each record and build the card
        for (let book of books) {
            content += this.#build_book_card(book);
        }

        // If there are no books in the db, add a message
        if (content.length) { this.#no_data_found_el.style.display = "none" }
        else { this.#no_data_found_el.style.display = "block" }

        // Finally, render it in the main container
        this.#main_el.innerHTML = content;
    }





    /**
     * Builds the Books' Card HTML item for a single book record.
     * @param book
     * @returns string
     */
    #build_book_card(book) {
        return `
            <div class="${book.read ? 'card read': 'card'}">
                <p class="name">${book.name}</p>
                <p class="author">${book.author}</p>
                <p class="description">${book.description}</p>
            
                <div class="footer">
                    <button>
                        <span class="md-icon" id="toggle-read-state_${book.id}">
                            ${book.read ? 'remove_done': 'done_all'}
                        </span>
                    </button>
                    <button>
                        <span class="md-icon" id="delete_${book.id}">delete</span>
                    </button>
                </div>
            </div>
        `;
    }







    /****************
     * Misc Helpers *
     ****************/



    /**
     * Generates a random ID that will be assigned to a freshly added book.
     * @returns string
     */
    #generate_id() {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 16) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }






    /**
     * Creates an async delay to simulate interactions with an API.
     * @param {*} seconds 
     * @returns Promise<void>
     */
    #delay(seconds = 1) {
        return new Promise((resolve) => { setTimeout(() => { resolve() }, seconds * 1000)});
    }
}