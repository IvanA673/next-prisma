import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/database/db";  

// Method 1: Next.js Dynamic Delete API route Handler
// For a cleaner and more RESTful API, it is recommended to use Next.js dynamic routing.
// This approach makes the URL structure more intuitive and aligns with RESTful principles.

// All parameters passed through the route are typically strings.
type IParams = {
  params: {
    id: string;
  };
};

// DELETE an entry
// We need to destructure params from the second arg because The second argument to the handler 
// function in Next.js API routes is an object that can contain various properties.
export async function DELETE(req: NextRequest, { params }: IParams) {
  
  // When destructuring an object, the variable name must match exactly the attribute name.
  const { id } = await params; // Destructure the id from params, need to await params because it is a promise

  try {
    await prisma.test.delete({
      where: {
        id: Number(id),
      },
    });
    console.log("Deleted test with id:", id); // Log the deleted id
    return NextResponse.json({ message: "Entry deleted." }, { status: 200 });
  } catch (err) {
    console.error("Error deleting test:", err); // Log the error
    return NextResponse.json({ message: "Error deleting entry." }, { status: 500 });
  }
}