export interface BookRequest{
    title : string;
    description : string;
    price : number;
}

export const getAllBooks = async () => {
    const response = await fetch("http://localhost:5120/books")

    return response.json();
}

export const createBook = async (bookRequest: BookRequest) => {
    await fetch("http://localhost:5120/books",{
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(bookRequest),
    });
}

export const updateBook = async (id: string, bookRequest: BookRequest) => {
    await fetch(`http://localhost:5120/books/${id}`,{
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(bookRequest),
    });
}

export const deleteBook = async (id: string) => {
    await fetch(`http://localhost:5120/books/${id}`,{
        method: "DELETE",
    });
}