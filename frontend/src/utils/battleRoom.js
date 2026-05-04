export const DEFAULT_CODE = " //Write your code here\n";
export const DEFAULT_OPPONENT_CODE = "// Waiting for opponent...\n";
export const DEFAULT_TIME_LEFT = 300;

export function parseModelJson(content) {
  if (!content || typeof content !== "string") {
    throw new Error("Model returned empty content");
  }

  const trimmed = content.trim();

  try {
    return JSON.parse(trimmed);
  } catch {
    
  }

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fencedMatch ? fencedMatch[1].trim() : trimmed;

  try {
    return JSON.parse(candidate);
  } catch {
   
  }

  const sanitized = sanitizeJson(candidate);
  
  try {
    return JSON.parse(sanitized);
  } catch {
  }

  const firstBrace = candidate.indexOf("{");
  const lastBrace = candidate.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const objectSlice = candidate.slice(firstBrace, lastBrace + 1);
    const sanitizedSlice = sanitizeJson(objectSlice);
    try {
      return JSON.parse(sanitizedSlice);
    } catch {
      throw new Error("Could not parse JSON from model response");
    }
  }

  throw new Error("Could not parse JSON from model response");
}

function sanitizeJson(jsonStr) {
  return jsonStr.replace(/"([^"\\]|\\.)*"/g, (match) => {
    return match
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t");
  });
}

export function formatTime(seconds) {
  if (seconds === null || seconds === undefined) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}