import { CaretDownIcon, CheckIcon, type Icon } from "@phosphor-icons/react";
import {
  useEffect,
  useRef,
  useState,
  useId,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import styles from "./dropdown.module.scss";

type DropdownOption = {
  value: string;
  label: string;
  icon?: Icon;
  color?: string;
};

type DropdownProps = {
  options: Array<DropdownOption>;
  value: string;
  onChange: (value: string) => void;
  label: string;
};

/**
 * Liste déroulante contrôlée avec navigation au clavier.
 *
 * Fonctionnalités :
 * - Sélection d'une option parmi une liste.
 * - Navigation avec les flèches, Home et End.
 * - Validation avec Enter ou Espace.
 * - Fermeture avec Escape, clic extérieur ou perte de focus.
 * - Désactivation automatique lorsque la liste est vide.
 * - Annonce de l'option active via aria-activedescendant.
 *
 * Le focus reste sur le bouton combobox pendant la navigation.
 *
 * @param props - Propriétés du composant.
 * @returns Le composant Dropdown.
 */
export default function Dropdown({
  options,
  value,
  onChange,
  label,
}: DropdownProps) {
  // ===============================================================
  // Constants
  // ===============================================================

  const listBoxId = useId();

  // ===============================================================
  // States
  // ===============================================================

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // ===============================================================
  // Refs
  // ===============================================================

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // ===============================================================
  // Derived data
  // ===============================================================

  const selectedOption = options.find((option) => option.value === value);
  const selectedLabel = selectedOption?.label ?? "Sélectionner une option";
  const SelectedIcon = selectedOption?.icon;
  const isDisabled = options.length === 0;

  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => value === option.value),
  );

  const safeActiveIndex = Math.min(
    activeIndex,
    Math.max(0, options.length - 1),
  );

  // ===============================================================
  // Handlers
  // ===============================================================

  function handleToggle() {
    if (isDisabled) return;
    
    setIsOpen((previous) => !previous);

    if (!isOpen) {
      setActiveIndex(selectedIndex);
    }
  }

  function handleSelect(optionValue: string) {
    onChange(optionValue);
    setIsOpen(false);
  }

  /**
   * Ferme le dropdown lorsque le focus quitte son conteneur.
   *
   * Vérifie si le nouvel élément recevant le focus appartient
   * au dropdown afin de conserver celui-ci ouvert lors
   * de la navigation entre ses éléments.
   *
   * @param event - Événement de focus déclenché sur le conteneur.
   */
  function handleFocusOut(event: FocusEvent<HTMLDivElement>) {
    const dropdown = dropdownRef.current;
    if (!dropdown) return;

    const focusTarget = event.relatedTarget;

    if (!dropdown.contains(focusTarget)) {
      setIsOpen(false);
    }
  }

  /**
   * Gère la navigation au clavier dans la liste déroulante.
   *
   * Le focus reste sur le bouton combobox tandis que
   * aria-activedescendant indique l'option active.
   *
   * @param event - Événement clavier du bouton combobox.
   */
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      event.stopPropagation();

      setIsOpen(false);
      triggerRef.current?.focus();

      return;
    }

    if (
      !isOpen &&
      isDisabled &&
      (event.key === "ArrowDown" || event.key === "ArrowUp")
    ) {
      event.preventDefault();

      setActiveIndex(selectedIndex);
      setIsOpen(true);

      return;
    }

    if (isDisabled || !isOpen) return;

    const activeOption = options[safeActiveIndex];
    if (!activeOption) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((safeActiveIndex + 1) % options.length);
        break;

      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((safeActiveIndex + options.length - 1) % options.length);
        break;

      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;

      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;

      case "Enter":
      case " ":
        event.preventDefault();
        handleSelect(activeOption.value);
        break;
    }
  }

  // ===============================================================
  // Effects
  // ===============================================================

  useEffect(() => {
    if (!isOpen) return;

    /**
     * Ferme le dropdown lorsqu'une interaction a lieu en dehors
     * de son conteneur.
     *
     * Vérifie que la cible de l'événement est un nœud du DOM,
     * puis détermine si elle appartient au dropdown.
     *
     * @param event - Événement de pointeur déclenché sur le document.
     */
    function handlePointerDown(event: PointerEvent) {
      const dropdown = dropdownRef.current;
      const interactionTarget = event.target;

      if (!dropdown || !(interactionTarget instanceof Node)) return;

      if (!dropdown.contains(interactionTarget)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <div ref={dropdownRef} onBlur={handleFocusOut} className={styles.dropdown}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onKeyDown={handleKeyDown}
        disabled={isDisabled}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listBoxId : undefined}
        aria-haspopup="listbox"
        aria-label={label}
        aria-activedescendant={
          isOpen && options.length > 0
            ? `${listBoxId}-option-${safeActiveIndex}`
            : undefined
        }
        onClick={handleToggle}
        className={styles.trigger}
      >
        {SelectedIcon && (
          <SelectedIcon
            size={20}
            color={selectedOption?.color}
            aria-hidden="true"
          />
        )}
        {selectedLabel}
        <CaretDownIcon
          className={styles.chevron}
          size={20}
          aria-hidden="true"
        />
      </button>

      {/* Liste déroulante */}
      {isOpen && (
        <div id={listBoxId} role="listbox" className={styles.listbox}>
          {options.map((option, index) => {
            const OptionIcon = option.icon;

            return (
              <div
                key={option.value}
                id={`${listBoxId}-option-${index}`}
                role="option"
                aria-selected={option.value === value}
                className={index === safeActiveIndex ? styles.active : ""}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(option.value)}
              >
                {OptionIcon && (
                  <OptionIcon
                    size={20}
                    color={option.color}
                    aria-hidden="true"
                  />
                )}
                {option.label}
                {option.value === value && (
                  <CheckIcon
                    size={18}
                    className={styles.checkIcon}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
