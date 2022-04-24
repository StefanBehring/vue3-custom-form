export function checkError(
  input: string,
  validation: string[],
  language: string
) {
  // REQUIRED
  if (validation.includes("required")) {
    if (input === "") {
      switch (language) {
        case "de":
          return { errorMessage: "Dies ist ein Pflichtfeld", foundError: true };
        case "en":
          return { errorMessage: "field is required", foundError: true };
        default:
          return { errorMessage: "field is required", foundError: true };
      }
    }
  }

  // MIN(x)
  if (validation.some((v) => /min\(\d*\)/.test(v))) {
    for (const toValidate of validation) {
      if (/min\(\d*\)/.test(toValidate)) {
        const minLength = parseInt(
          toValidate.replace("min(", "").replace(")", "")
        );
        if (input.length < minLength) {
          switch (language) {
            case "de":
              return {
                errorMessage: `die minimale Länge ist ${minLength} Zeichen`,
                foundError: true,
              };
            case "en":
              return {
                errorMessage: `the minimum length is ${minLength} characters`,
                foundError: true,
              };
            default:
              return {
                errorMessage: `the minimum length is ${minLength} characters`,
                foundError: true,
              };
          }
        }
      }
    }
  }

  // MAX(x)
  if (validation.some((v) => /max\(\d*\)/.test(v))) {
    for (const toValidate of validation) {
      if (/max\(\d*\)/.test(toValidate)) {
        const maxLength = parseInt(
          toValidate.replace("max(", "").replace(")", "")
        );
        if (input.length > maxLength) {
          switch (language) {
            case "de":
              return {
                errorMessage: `die maximale Länge ist ${maxLength} Zeichen`,
                foundError: true,
              };
            case "en":
              return {
                errorMessage: `the maximum length is ${maxLength} characters`,
                foundError: true,
              };
            default:
              return {
                errorMessage: `the maximum length is ${maxLength} characters`,
                foundError: true,
              };
          }
        }
      }
    }
  }

  // RANGE(x,y)
  if (validation.some((v) => /range\(\d*,\d*\)/.test(v))) {
    for (const toValidate of validation) {
      if (/range\(\d*,\d*\)/.test(toValidate)) {
        const range = toValidate
          .replace("range(", "")
          .replace(")", "")
          .split(",");
        if (
          parseInt(input) < parseInt(range[0]) ||
          parseInt(input) > parseInt(range[1])
        ) {
          switch (language) {
            case "de":
              return {
                errorMessage: `Muss zwischen ${range[0]} und ${range[1]} liegen`,
                foundError: true,
              };
            case "en":
              return {
                errorMessage: `Must be between ${range[0]} and ${range[1]}`,
                foundError: true,
              };
            default:
              return {
                errorMessage: `Must be between ${range[0]} and ${range[1]}`,
                foundError: true,
              };
          }
        }
      }
    }
  }
  return { foundError: false, errorMessage: "" };
}
