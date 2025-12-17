import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export async function POST(request: Request) {
  try {
    if (! process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Configuration serveur incomplète." }, { status: 500 });
    }

    const body = await request.json();
    const { firstName, lastName, phone, email, origin, destination, departure, vehicle } = body;

    if (!firstName || !phone || !departure) {
      return NextResponse. json(
        { error: "Champs manquants (Nom, Téléphone ou Date)" },
        { status: 400 }
      );
    }

    const dateObj = new Date(departure);
    const dateReadable = dateObj.toLocaleDateString("fr-FR", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const sendToAdmin = resend.emails. send({
      from: "Réservation Web <onboarding@resend.dev>",
      to: ["vklasstransport@gmail.com"],
      subject: `🚖 Nouvelle Course :  ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h1>Nouvelle demande de réservation</h1>
          <hr />
          <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
          <p><strong>Téléphone :</strong> ${phone}</p>
          <p><strong>Trajet :</strong> De ${origin} à ${destination}</p>
          <p><strong>Date :</strong> ${dateReadable}</p>
          <p><strong>Véhicule :</strong> ${vehicle?. name || "Non spécifié"}</p>
        </div>
      `,
    });

    let sendToClient:  Promise<unknown> = Promise.resolve(null);

    if (email) {
      sendToClient = resend.emails.send({
        from: "V-Klass Transport <onboarding@resend.dev>",
        to: [email],
        subject: `Confirmation de votre demande de transport`,
        html: `
          <div style="font-family: sans-serif; color: #333;">
            <h2>Merci ${firstName}, votre demande est bien reçue !</h2>
            <p><strong>Départ :</strong> ${origin}</p>
            <p><strong>Arrivée :</strong> ${destination}</p>
            <p><strong>Date : </strong> ${dateReadable}</p>
            <p><strong>Véhicule :</strong> ${vehicle?. name || "Standard"}</p>
            <p>À très vite,<br/>L'équipe V-Klass Transport</p>
          </div>
        `,
      });
    }

    await Promise.all([sendToAdmin, sendToClient]);

    return NextResponse.json({ success: true });
  } catch (error:  unknown) {
    console.error("Erreur d'envoi d'email:", error);
    return NextResponse.json({ error: "Erreur serveur lors de l'envoi." }, { status: 500 });
  }
}