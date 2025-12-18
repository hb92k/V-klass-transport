import { NextResponse } from "next/server";

// Simplified endpoint: removed Resend integration per request.
// Keeps input validation and error responses, but does not send emails.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, origin, destination, departure, vehicle } = body;

    if (!firstName || !phone || !departure) {
      return NextResponse.json({ error: "Champs manquants (Nom, Téléphone ou Date)" }, { status: 400 });
    }

    // keep same date formatting for consistency
    const dateObj = new Date(departure);
    const dateReadable = dateObj.toLocaleDateString("fr-FR", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Log the booking server-side instead of sending emails
    console.info("Nouvelle réservation (simulée) :", {
      firstName,
      lastName,
      phone,
      email,
      origin,
      destination,
      date: dateReadable,
      vehicle,
    });

    // Respond success to client; keep any client-side error behavior unchanged
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Erreur serveur lors du traitement de la réservation:", error);
    return NextResponse.json({ error: "Erreur serveur lors du traitement." }, { status: 500 });
  }
}