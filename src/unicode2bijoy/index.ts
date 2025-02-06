import banglaAlphabets from "../common/bangladeshi-bangla-alphabets";
import joinedAlphabets from "../common/bangladeshi-joined-alphabets";
import numberAlphabets from "../common/bangladeshi-number-alphabets";
import signAlphabets from "../common/bangladeshi-sign-alphabets";
import vowelAlphabets from "../common/bangladeshi-vowel-alphabets";
import vowelSignAlphabets from "../common/bangladeshi-vowel-sign-alphabets";
import mappingMap from "../common/mapping/re-arrangement-map";

const unicodeConverter = (text: string): string => {
  const mappings = [
    ...banglaAlphabets.map(([k, v]) => ({ key: v, value: k })),
    ...vowelAlphabets.map(([k, v]) => ({ key: v, value: k })),
    ...vowelSignAlphabets.map(([k, v]) => ({ key: v, value: k })),
    ...numberAlphabets.map(([k, v]) => ({ key: v, value: k })),
    ...signAlphabets.map(([k, v]) => ({ key: v, value: k })),
    ...joinedAlphabets.map(([k, v]) => ({ key: v, value: k })),
  ];

  let convertedText = "";
  let i = 0;

  while (i < text.length) {
    let char = text[i];
    let nextChar = text[i + 1] || "";

    // Handle joined alphabets
    for (const mapping of mappings) {
      if (mapping.key === char + nextChar) {
        convertedText += mapping.value;
        i += 2;
      } else if (mapping.key === char) {
        convertedText += mapping.value;
        i++;
      }
    }
  }

  return convertedText;
};

export default function UnicodeToBijoy(text: string): string {
  const mappings = mappingMap.map(([k, v]) => ({ key: v, value: k }));

  var remappingText = '';

	// Bijoy to Unicode remapping
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		const nextChar = text[i + 1];

		if (mappings.some(m => m.key === nextChar)) {
			remappingText += char + nextChar;
			i++;
		} else if (mappings.some(m => m.key === char)) {
			remappingText += nextChar;
			remappingText += char;
			i++;
		} else {
			remappingText += char;
		}
	}

  return unicodeConverter(remappingText);
}
