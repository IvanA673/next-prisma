import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/database/db";

// GET all entries
export async function GET(req: NextRequest) {
  try {
    const tests = await prisma.test.findMany();
    console.log(tests)
    return NextResponse.json(tests);
  } catch (err) {
    console.error("Error fetching tests:", err); // Log the error
    return NextResponse.json("No test entries found.", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;
    const newTest = await prisma.test.create({
      data: {
        name: name,
      },
    });
    console.log("Created new test:", newTest); // Log the created data
    return NextResponse.json(newTest, { status: 201 });
  } catch (err) {
    console.error("Error creating test:", err); // Log the error
    return NextResponse.json({ message: "Error creating entry." }, { status: 500 });
  }
}

// //Method 2: Using a form with a hidden input
// // DELETE an entry
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body; // Destructure the id from the body
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

// Method 3: Using a query string
// This handler uses the URL constructor to parse the URL and extract the id parameter from the query string.
// DELETE an entry
// export async function DELETE(req: NextRequest) {
//   try {
//     const { searchParams } = new URL(req.url, `http://${req.headers.get('host')}`);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ message: "ID is required" }, { status: 400 });
//     }

//     await prisma.test.delete({
//       where: {
//         id: Number(id),
//       },
//     });
//     console.log("Deleted test with id:", id); // Log the deleted id
//     return NextResponse.json({ message: "Entry deleted." }, { status: 200 });
//   } catch (err) {
//     console.error("Error deleting test:", err); // Log the error
//     return NextResponse.json({ message: "Error deleting entry." }, { status: 500 });
//   }
// }