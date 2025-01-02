"use client"
import {Test} from "@prisma/client";
import React, { useState, useEffect } from "react";

export default function TestList() {
    const [testData, setTestData] = useState<Test[]>([]);

    const fetchTests = async () => {
        try {
            const response = await fetch("/api/tests");
            if (!response.ok) {
                console.error("Error fetching tests:", response.statusText);
                return;
            }
            const tests = await response.json();
            setTestData(Array.isArray(tests) ? tests : []);
        } catch (error) {
            console.error("Error fetching tests:", error);
        }
    };

    useEffect(() => {
        fetchTests();
    }, []);

    async function handleAddTest(event: React.FormEvent<HTMLFormElement>) {
    // Prevents the default form submission behavior, which would normally cause the page to reload. 
    // This allows you to handle the form submission with JavaScript instead.
    event.preventDefault();

    // Create a new FormData object from the form element
    const formData = new FormData(event.target as HTMLFormElement);

    // Get the value of the "name" field from the form data
    const name = formData.get("name");
    const response = await fetch("/api/tests", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding test:", errorData.message);
        return;
    }
    fetchTests(); // Fetch the updated list after adding a new test
    (event.target as HTMLFormElement).reset(); //Clear the form after submission
    }

    // There are many ways to handle deleting an entry. Deleting is special because you need to know
    // which entry to delete. You can pass the id of the entry to the server in a few different ways.
    // Here are three examples of how you can delete an entry from the list.


    // Example 1: Leveraging Next.js Dynamic Routing (Preferred method)
    async function handleDeleteTest(id: number) {

        const response = await fetch(`/api/tests/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error deleting test:", errorData.message);
          return;
      }
      fetchTests(); // Fetch the updated list after deleting a test
    }

    // Example 2: Using a form with a hidden input
    async function handleDeleteTest2(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const id = formData.get("id"); // Get the id from the form data

        const response = await fetch("/api/tests", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }), // Pass the id as a JSON payload
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error deleting test:", errorData.message);
          return;
      }
      fetchTests(); // Fetch the updated list after deleting a test
    }
    

    // Example 3: Using a query string. 
    async function handleDeleteTest3(id: number) {

        const response = await fetch(`/api/tests?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error deleting test:", errorData.message);
          return;
      }
      fetchTests(); // Fetch the updated list after deleting a test
    }

    // Method 1: Leveraging Next.js Dynamic Routing (Preferred method)
    return (
        <div>
            <h1>Test List</h1>
            <form onSubmit={handleAddTest}>
                <input name="name" type="text" placeholder="Add a new test" />
                <button type="submit">Add Test</button>
            </form>

            <ul>
                {testData.map((test) => (
                <li key={test.id}>
                    <span>{test.name}</span>
                    {/* Arrow function here allows us to pass an arg into function call */}
                    <form onSubmit={() => handleDeleteTest(test.id)}>
                        <button type="submit">Delete</button>
                    </form>
                </li>                
                ))}
            </ul>
        </div>
    );

    // Method 2: Using a form with a hidden input
    return (
        <div>
            <h1>Test List</h1>
            <form onSubmit={handleAddTest}>
                <input name="name" type="text" placeholder="Add a new test" />
                <button type="submit">Add Test</button>
            </form>

            <ul>
                {testData.map((test) => (
                <li key={test.id}>
                    <span>{test.name}</span>
                    <form onSubmit={handleDeleteTest2}>
                        <input type="hidden" name="id" value={test.id} />
                        <button type="submit">Delete</button>
                    </form>
                </li>                
                ))}
            </ul>
        </div>
    );

    // Method 3: Using a query string
    return (
        <div>
            <h1>Test List</h1>
            <form onSubmit={handleAddTest}>
                <input name="name" type="text" placeholder="Add a new test" />
                <button type="submit">Add Test</button>
            </form>

            <ul>
                {testData.map((test) => (
                <li key={test.id}>
                    <span>{test.name}</span>
                    {/* Arrow function here allows us to pass an arg into function call */}
                    <form onSubmit={() => handleDeleteTest3(test.id)}>
                        <button type="submit">Delete</button>
                    </form>
                </li>                
                ))}
            </ul>
        </div>
    );
}