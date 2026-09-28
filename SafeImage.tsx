"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

/** next/image com fallback visual caso a URL remota falhe. */
export function SafeImage({ alt, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-blue-soft to-mist text-brand-blue/40"
      >
        <ImageOff className="h-8 w-8" aria-hidden />
      </div>
    );
  }
  return <Image alt={alt} onError={() => setFailed(true)} {...props} />;
}
