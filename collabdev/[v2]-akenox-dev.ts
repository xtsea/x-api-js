// AkenoX Dev API (TypeScript)

export const AnimeHentai = async (prompt: string) => {
  const url = `https://example.com/api?query${encodeURIComponent(prompt)}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return { error: null };
  }
};
