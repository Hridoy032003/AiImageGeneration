import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    console.log("Session:", session); 

    const body = await request.json();
    const { useCredit } = body;

   
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user= await db.user.findUnique({
        where:{
            id:session?.user.id
        }
    })
    if(useCredit > user?.credits!){
        return NextResponse.json({ error: "Insufficient credits" }, { status: 403 });
    }

    let creditsToDecrement = useCredit;
    if (typeof useCredit !== 'number') {
        creditsToDecrement = parseInt(useCredit, 10);
    }
    if (typeof creditsToDecrement !== 'number' || isNaN(creditsToDecrement) || creditsToDecrement <= 0) {
        return NextResponse.json(
            { error: "Invalid 'useCredit' value. Must be a positive number." },
            { status: 400 }
        );
    }
 

    console.log("User ID for update:", session?.user.id);
    console.log("Decrementing by:", creditsToDecrement);


    const reduceToken = await db.user.update({
      where: {
        id: session.user.id, 
      },
      data: {
        credits: {
           decrement: creditsToDecrement,
        },
      },
      select: { credits: true } 
    });

    return NextResponse.json(
      { message: "Success", credits: reduceToken.credits, session: session },
      { status: 200 }
    );
  } catch (err) {
    console.error("Internal Server Error:", err); 
  

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}