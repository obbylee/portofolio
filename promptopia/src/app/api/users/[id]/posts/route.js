import Prompt from "@src/models/prompt";
import { connectToDB } from "@src/utils/database";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {
      status: 500,
    });
  }
}
