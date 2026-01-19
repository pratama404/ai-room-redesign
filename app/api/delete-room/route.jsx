import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { storage } from "@/config/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";

export async function POST(req) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    try {
        // 1. Get the record first
        const record = await db.select().from(AiGeneratedImage).where(eq(AiGeneratedImage.id, id));

        if (record.length > 0) {
            const { aiImage, orgImage } = record[0];

            // 2. Delete from Firebase Storage (Try/Catch in case file not found)
            try {
                if (aiImage) {
                    const aiRef = ref(storage, aiImage);
                    await deleteObject(aiRef);
                }
                if (orgImage) {
                    const orgRef = ref(storage, orgImage);
                    await deleteObject(orgRef);
                }
            } catch (storageError) {
                console.error("Error deleting files from Firebase (ignoring):", storageError);
                // Continue to delete from DB even if file delete fails
            }
        }

        // 3. Delete from DB
        const result = await db.delete(AiGeneratedImage)
            .where(eq(AiGeneratedImage.id, id))
            .returning();

        return NextResponse.json({ result: "Deleted" });
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
