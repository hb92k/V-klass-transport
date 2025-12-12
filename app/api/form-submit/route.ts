import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, origin, destination, departure, vehicle } = body;

    // Validation simple
    if (!firstName || !phone || !departure) {
      return NextResponse.json(
        { error: "Champs manquants (Nom, Téléphone ou Date)" },
        { status: 400 }
      );
    }

    // Formatage de la date pour un affichage lisible
    const dateObj = new Date(departure);
    const dateReadable = dateObj.toLocaleDateString("fr-FR", {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    // --- EMAIL 1 : ADMIN (vklasstransport@gmail.com) ---
    const sendToAdmin = resend.emails.send({
      from: "Réservation Web <onboarding@resend.dev>", // Remplace par ton domaine vérifié (ex: contact@vklass.com)
      to: ["vklasstransport@gmail.com"],
      subject: `🚖 Nouvelle Course : ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h1>Nouvelle demande de réservation</h1>
          <p>Un client vient de passer commande sur le site.</p>
          <hr />
          <h3>👤 Client</h3>
          <ul>
            <li><strong>Nom :</strong> ${firstName} ${lastName}</li>
            <li><strong>Téléphone :</strong> <a href="tel:${phone}">${phone}</a></li>
            <li><strong>Email :</strong> ${email || "Non renseigné"}</li>
          </ul>
          <h3>📍 Trajet</h3>
          <ul>
            <li><strong>De :</strong> ${origin}</li>
            <li><strong>À :</strong> ${destination}</li>
            <li><strong>Date :</strong> ${dateReadable}</li>
            <li><strong>Véhicule :</strong> ${vehicle ? vehicle.name : "Non spécifié"}</li>
          </ul>
        </div>
      `,
    });

    // --- EMAIL 2 : CLIENT (Confirmation) ---
    // On ne l'envoie que si le client a mis son email
    let sendToClient = Promise.resolve(null); 
    
    if (email) {
      sendToClient = resend.emails.send({
        from: "V-Klass Transport <onboarding@resend.dev>", // Remplace par ton domaine vérifié
        to: [email],
        subject: `Confirmation de votre demande de transport`,
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Merci ${firstName}, votre demande est bien reçue !</h2>
            <p>Nous avons bien pris en compte votre demande de transport. Notre équipe va traiter votre réservation et vous recontactera très rapidement par téléphone pour valider les détails.</p>
            
            <div style="background-color: #f4f4f4; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top:0;">Récapitulatif :</h3>
              <p><strong>Départ :</strong> ${origin}</p>
              <p><strong>Arrivée :</strong> ${destination}</p>
              <p><strong>Date :</strong> ${dateReadable}</p>
              <p><strong>Véhicule souhaité :</strong> ${vehicle ? vehicle.name : "Standard"}</p>
            </div>

            <p>À très vite,<br/>L'équipe V-Klass Transport</p>
          </div>
        `,
      });
    }

    // On attend que les deux emails partent
    await Promise.all([sendToAdmin, sendToClient]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur d'envoi d'email:", error);
    return NextResponse.json({ error: "Erreur serveur lors de l'envoi." }, { status: 500 });
  }
}