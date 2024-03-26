import Prompt from "@src/models/prompt";
import { connectToDB } from "@src/utils/database";

export async function GET(request, { params }) {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const {prompt, tag} = await request.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    // update
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response("Prompt Updated!", { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Error updating promp", { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted!", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
}
