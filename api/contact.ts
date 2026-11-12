import nodemailer from "nodemailer";

/**
 * Point d'entrée serveur du formulaire de contact.
 * Accepte uniquement les requêtes POST, valide les données reçues,
 * puis transmet le message par e-mail via Gmail.
 */
export default {
  async fetch(request: Request): Promise<Response> {
    // Refuse les autres méthodes et indique au client celle qui est acceptée.
    if (request.method !== "POST") {
      return Response.json(
        { error: "Méthode non autorisée." },
        {
          status: 405,
          headers: { Allow: "POST" },
        },
      );
    }

    // Le contenu reste inconnu tant que sa structure n'a pas été vérifiée.
    let body: unknown;

    try {
      // Lit le corps de la requête et convertit le JSON en valeur JavaScript.
      body = await request.json();
    } catch {
      // Un corps vide ou un JSON mal formé ne peut pas être traité.
      return Response.json(
        { error: "Le corps de la requête doit contenir un JSON valide." },
        { status: 400 },
      );
    }

    // Attend un objet pour pouvoir ensuite vérifier les champs du formulaire.
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return Response.json(
        { error: "Les données du formulaire doivent être un objet." },
        { status: 400 },
      );
    }

    // Refuse un champ piège renseigné ou transmis avec un type inattendu.
    if (
      "website" in body &&
      (typeof body.website !== "string" || body.website !== "")
    ) {
      return Response.json(
        { error: "La demande n'a pas pu être traitée." },
        { status: 400 },
      );
    }

    // Vérifie que chaque champ attendu existe et contient du texte.
    if (
      !("name" in body) ||
      typeof body.name !== "string" ||
      !("email" in body) ||
      typeof body.email !== "string" ||
      !("subject" in body) ||
      typeof body.subject !== "string" ||
      !("message" in body) ||
      typeof body.message !== "string"
    ) {
      return Response.json(
        {
          error:
            "Les champs nom, e-mail, objet et message doivent être des textes.",
        },
        { status: 400 },
      );
    }

    // Retire les espaces aux extrémités avant de vérifier le contenu des champs.
    const name = body.name.trim();
    const email = body.email.trim();
    const subject = body.subject.trim();
    const message = body.message.trim();

    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: "Tous les champs du formulaire sont obligatoires." },
        { status: 400 },
      );
    }

    // Applique côté serveur les mêmes limites de longueur que dans le formulaire.
    if (
      name.length > 100 ||
      email.length > 254 ||
      subject.length > 150 ||
      message.length > 5000
    ) {
      return Response.json(
        {
          error:
            "Un ou plusieurs champs dépassent la longueur maximale autorisée.",
        },
        { status: 400 },
      );
    }

    // Vérifie une structure courante d'adresse e-mail, sans garantir son existence.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return Response.json(
        { error: "Veuillez saisir une adresse e-mail valide." },
        { status: 400 },
      );
    }

    // Lit la configuration privée nécessaire à l'envoi des messages.
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const contactTo = process.env.CONTACT_TO;

    if (!smtpUser || !smtpPassword || !contactTo) {
      return Response.json(
        { error: "Le service d'envoi est temporairement indisponible." },
        { status: 503 },
      );
    }

    // Configure l'envoi SMTP via Gmail avec une connexion chiffrée dès son ouverture.
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    try {
      // Envoie depuis notre compte Gmail. Les réponses iront au visiteur.
      await transporter.sendMail({
        from: {
          name: "Portfolio ─ Cédric Kernec",
          address: smtpUser,
        },
        to: contactTo,
        replyTo: {
          name,
          address: email,
        },
        subject: `Contact portfolio ─ ${subject}`,
        text: [`Nom : ${name}`, `Email : ${email}`, "", message].join("\n"),
      });

      return Response.json({
        message: "Votre message a bien été envoyé.",
      });
    } catch {
      // Retourne un message public sans exposer les détails de la connexion SMTP.
      return Response.json(
        { error: "L'envoi a échoué. Veuillez réessayer ultérieurement." },
        { status: 502 },
      );
    }
  },
};
