document.getElementById("generateBtn").addEventListener("click", async () => {
  const notes = document.getElementById("notes").value;
  const summaryDiv = document.getElementById("summary");
  const keypointsDiv = document.getElementById("keypoints");
  const mcqsDiv = document.getElementById("mcqs");

  summaryDiv.innerText = "Generating...";
  keypointsDiv.innerText = "Generating...";
  mcqsDiv.innerText = "Generating...";

  const HF_API_KEY = "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";

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${HF_API_KEY}`
        },
        body: JSON.stringify({
          inputs: "Summarize the following notes, list key points and 3 MCQs:\n" + notes
        })
      }
    );

    const data = await response.json();
    const result = data[0].generated_text;

    const parts = result.split(/\n\n/);
    summaryDiv.innerText = parts[0] || "";
    keypointsDiv.innerText = parts.slice(1, 2).join("\n") || "";
    mcqsDiv.innerText = parts.slice(2).join("\n") || "";

  } catch (err) {
    summaryDiv.innerText = "Error generating summary.";
    keypointsDiv.innerText = "";
    mcqsDiv.innerText = "";
    console.error(err);
  }
});
