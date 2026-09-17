import { describe, expect, it } from "vitest";
import { generateQrDataUrl, isBlankInput, normalizeQrInput } from "./qr-utils";

describe("isBlankInput", () => {
  it("treats an empty string as blank", () => {
    expect(isBlankInput("")).toBe(true);
  });

  it("treats whitespace-only input as blank", () => {
    expect(isBlankInput("   \n\t")).toBe(true);
  });

  it("treats real content as not blank", () => {
    expect(isBlankInput("https://ejemplo.com")).toBe(false);
  });
});

describe("normalizeQrInput", () => {
  it("prefixes https:// to a bare domain when the type is url", () => {
    expect(normalizeQrInput("ejemplo.com", "url")).toBe("https://ejemplo.com");
  });

  it("prefixes https:// to a bare domain with a path and query string", () => {
    expect(normalizeQrInput("www.ejemplo.com/ruta?x=1", "url")).toBe(
      "https://www.ejemplo.com/ruta?x=1",
    );
  });

  it("leaves a URL that already has a scheme untouched", () => {
    expect(normalizeQrInput("https://ejemplo.com", "url")).toBe("https://ejemplo.com");
    expect(normalizeQrInput("http://ejemplo.com", "url")).toBe("http://ejemplo.com");
  });

  it("does not touch mailto:/tel: style schemes", () => {
    expect(normalizeQrInput("mailto:hola@ejemplo.com", "url")).toBe(
      "mailto:hola@ejemplo.com",
    );
  });

  it("trims surrounding whitespace", () => {
    expect(normalizeQrInput("  ejemplo.com  ", "url")).toBe("https://ejemplo.com");
  });

  it("does not prefix plain text that is not domain-shaped", () => {
    expect(normalizeQrInput("hola mundo", "url")).toBe("hola mundo");
  });

  it("does not normalize when the selected type is not url", () => {
    expect(normalizeQrInput("ejemplo.com", "social")).toBe("ejemplo.com");
    expect(normalizeQrInput("ejemplo.com", "email")).toBe("ejemplo.com");
  });

  it("returns an empty string untouched", () => {
    expect(normalizeQrInput("", "url")).toBe("");
    expect(normalizeQrInput("   ", "url")).toBe("");
  });
});

describe("generateQrDataUrl", () => {
  const baseOptions = {
    color: { dark: "#000000", light: "#ffffff" },
    width: 200,
    margin: 2,
  };

  it("resolves with a PNG data URL for valid input", async () => {
    const result = await generateQrDataUrl("https://ejemplo.com", baseOptions);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.dataUrl.startsWith("data:image/png;base64,")).toBe(true);
    }
  });

  it("returns a handled error instead of throwing when input exceeds QR capacity", async () => {
    // The `qrcode` library caps out around ~2950 alphanumeric characters at
    // error-correction level H. This reproduces the real bug: before this
    // fix the thrown exception only reached `console.error`.
    const tooLong = "a".repeat(4000);
    const result = await generateQrDataUrl(tooLong, {
      ...baseOptions,
      errorCorrectionLevel: "H",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(typeof result.error).toBe("string");
      expect(result.error.length).toBeGreaterThan(0);
    }
  });
});
