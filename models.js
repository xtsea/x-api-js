// parameter models
const GptModelOld = (prompt) => ({
    model: "gpt-4o",
    prompt: prompt,
    top_p: 1,
    logprobs: null,
    stop: null
});

export { GptModelOld };
