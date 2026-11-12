import { PaperPlaneTiltIcon } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState, type SubmitEvent } from "react";

import ActionButton from "../../../components/ActionButton/ActionButton";

import styles from "./contactForm.module.scss";

// ==========================================
// Types
// ==========================================

type ContactField = "name" | "email" | "subject" | "message";
type ContactErrors = Partial<Record<ContactField, string>>;
type SubmissionStatus =
  | "idle"
  | "sending"
  | "success"
  | "error"
  | "rate-limited";

export default function ContactForm() {
  // ===============================================================
  // IDs
  // ===============================================================

  const id = useId();
  const nameId = `${id}-name`;
  const nameErrorId = `${id}-name-error`;
  const emailId = `${id}-email`;
  const emailErrorId = `${id}-email-error`;
  const subjectId = `${id}-subject`;
  const subjectErrorId = `${id}-subject-error`;
  const messageId = `${id}-message`;
  const messageErrorId = `${id}-message-error`;
  const messageHintId = `${id}-message-hint`;

  // ===============================================================
  // Refs
  // ===============================================================

  const formRef = useRef<HTMLFormElement>(null);

  // ===============================================================
  // States
  // ===============================================================

  const [errors, setErrors] = useState<ContactErrors>({});
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");

  // ===============================================================
  // Handlers
  // ===============================================================

  /**
   * Valide les champs puis transmet le formulaire à l'API de contact
   */
  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // Ignore les nouvelles soumissions pendant un envoi.
    if (submissionStatus === "sending") return;
    setSubmissionStatus("idle");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors: ContactErrors = {};

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const website = String(formData.get("website") ?? "");

    if (!name) {
      nextErrors.name = "Veuillez renseigner votre nom.";
    }

    if (!email) {
      nextErrors.email = "Veuillez renseigner votre adresse e-mail.";
    } else {
      const emailInput = form.elements.namedItem("email");

      if (
        emailInput instanceof HTMLInputElement &&
        (emailInput.validity.typeMismatch ||
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      ) {
        nextErrors.email = "Veuillez saisir une adresse e-mail valide.";
      }
    }

    if (!subject) {
      nextErrors.subject = "Veuillez renseigner un objet.";
    }

    if (!message) {
      nextErrors.message = "Veuillez écrire votre message.";
    }

    if (name.length > 100) {
      nextErrors.name = "Le nom ne doit pas dépasser 100 caractères.";
    }

    if (email.length > 254) {
      nextErrors.email =
        "L'adresse e-mail ne doit pas dépasser 254 caractères.";
    }

    if (subject.length > 150) {
      nextErrors.subject = "L'objet ne doit pas dépasser 150 caractères.";
    }

    if (message.length > 5000) {
      nextErrors.message = "Le message ne doit pas dépasser 5 000 caractères.";
    }

    setErrors(nextErrors);

    // Arrête le traitement si la validation locale détecte une erreur.
    if (Object.keys(nextErrors).length > 0) return;

    setSubmissionStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message, website }),
      });

      // Distingue la limitation des requêtes des autres erreurs d'envoi.
      if (response.status === 429) {
        setSubmissionStatus("rate-limited");
        return;
      }

      if (!response.ok) {
        setSubmissionStatus("error");
        return;
      }

      setSubmissionStatus("success");

      // Vide les champs uniquement après confirmation de l'envoi par l'API.
      form.reset();
    } catch {
      // Gère les échecs réseau qui empêchent de recevoir une réponse.
      setSubmissionStatus("error");
    }
  }

  // ===============================================================
  // Effects
  // ===============================================================

  // Après l'affichage des erreurs, guide l'utilisateur vers le premier champ invalide.
  useEffect(() => {
    const isError = Object.keys(errors).length > 0;

    if (!isError) return;

    const firstInvalidField = formRef.current?.querySelector<
      HTMLInputElement | HTMLTextAreaElement
    >('[aria-invalid="true"]');

    if (firstInvalidField) {
      firstInvalidField?.focus({ preventScroll: true });
      firstInvalidField.parentElement?.scrollIntoView({
        block: "center",
        behavior: "instant",
      });
    }
  }, [errors]);

  // ===============================================================
  // Return
  // ===============================================================

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={styles.form}
      noValidate
    >
      {/* Champ piège antispam, exclu de l'affichage et de la navigation */}
      <div hidden>
        <label htmlFor={`${id}-website`}>Votre site web</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <div className={styles.identityFields}>
        <div className={styles.field}>
          <label htmlFor={nameId}>Nom (obligatoire)</label>
          <input
            id={nameId}
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? nameErrorId : undefined}
            required
            disabled={submissionStatus === "sending"}
          />
          {errors.name && (
            <p id={nameErrorId} className={styles.error}>
              {errors.name}
            </p>
          )}
        </div>
        <div className={styles.field}>
          <label htmlFor={emailId}>Adresse e-mail (obligatoire)</label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? emailErrorId : undefined}
            required
            disabled={submissionStatus === "sending"}
          />
          {errors.email && (
            <p id={emailErrorId} className={styles.error}>
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor={subjectId}>Objet (obligatoire)</label>
        <input
          id={subjectId}
          name="subject"
          type="text"
          maxLength={150}
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={errors.subject ? subjectErrorId : undefined}
          required
          disabled={submissionStatus === "sending"}
        />
        {errors.subject && (
          <p id={subjectErrorId} className={styles.error}>
            {errors.subject}
          </p>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor={messageId}>Message (obligatoire)</label>
        <textarea
          id={messageId}
          name="message"
          rows={6}
          maxLength={5000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message
              ? `${messageHintId} ${messageErrorId}`
              : messageHintId
          }
          required
          disabled={submissionStatus === "sending"}
        />
        <p id={messageHintId} className={styles.hint}>
          5 000 caractères maximum
        </p>
        {errors.message && (
          <p id={messageErrorId} className={styles.error}>
            {errors.message}
          </p>
        )}
      </div>
      <ActionButton
        type="submit"
        label={
          submissionStatus === "sending"
            ? "Envoi en cours..."
            : "Envoyer le message"
        }
        disabled={submissionStatus === "sending"}
        leftIcon={PaperPlaneTiltIcon}
      />

      {/* Retour sur l'envoi annoncé sans déplacer le focus */}
      <p
        role="status"
        className={styles.submissionStatus}
        data-status={submissionStatus}
      >
        {submissionStatus === "sending" && "Envoi de votre message en cours..."}
        {submissionStatus === "success" && "Votre message a bien été envoyé."}
        {submissionStatus === "error" &&
          "L'envoi a échoué. Veuillez réessayer ou me contacter par e-mail."}
        {submissionStatus === "rate-limited" &&
          "Trop de tentatives ont été effectuées. Veuillez patienter avant de réessayer ou me contacter par e-mail."}
      </p>
    </form>
  );
}
