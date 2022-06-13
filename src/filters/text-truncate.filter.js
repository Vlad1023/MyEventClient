
export default function textTruncate (sourceText) {
    if(sourceText && sourceText.length > 300) {
      return sourceText.slice(0,300) + '...'; 
    }
    return sourceText;
  };