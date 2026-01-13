const parseTextoParaFrases = (texto) => {
  if (!texto || typeof texto !== "string") return [];

  // normaliza quebras de linha (Windows / Unix)
  const linhas = texto
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const frases = [];

  // percorre de 2 em 2 (EN + PT)
  for (let i = 0; i < linhas.length; i += 2) {
    const ingles = linhas[i];
    const portugues = linhas[i + 1];

    if (!ingles || !portugues) continue;

    frases.push(`${ingles}  ${portugues}`);
  }

  return frases;
};

export { parseTextoParaFrases };
