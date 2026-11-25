import { useState, type ImgHTMLAttributes } from "react";

import imageUnavailable from "../../assets/images/fallbacks/image-unavailable.png";

type ImageWithFallbackProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "onError"
> & {
  src: string;
  alt: string;
};

export default function ImageWithFallback({
  src,
  alt,
  ...imageProps
}: ImageWithFallbackProps) {
  // ===============================================================
  // States
  // ===============================================================

  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  // ===============================================================
  // Derived data
  // ===============================================================

  const hasError = failedSrc === src;
  const displayedSrc = hasError ? imageUnavailable : src;

  // Signale l’indisponibilité, tout en conservant les images décoratives silencieuses.
  const displayedAlt = hasError && alt ? `Visuel indisponible : ${alt}` : alt;

  // ===============================================================
  // Handlers
  // ===============================================================

  /**
   * Active le visuel de secours pour la source courante.
   * Si le secours échoue également, ne relance aucun remplacement.
   */
  function handleError() {
    if (hasError) return;

    setFailedSrc(src);
  }

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <img {...imageProps} src={displayedSrc} alt={displayedAlt} onError={handleError} />
  );
}