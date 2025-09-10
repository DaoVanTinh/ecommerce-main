import React from "react";

import { useState } from "react";

export default function ImageWithFallback({ src, alt, fallback, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt || "Image"}
      onError={() => setImgSrc(fallback)}
      {...props}
    />
  );
}
