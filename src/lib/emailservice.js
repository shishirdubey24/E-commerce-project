import emailjs from 'emailjs-com';

// Send Verification Email function
export const sendVerificationEmail = async (email, token) => {
    
  try {
    // Send the email using EmailJS
    await emailjs.send(
      'service_wfy1ku4', // Replace with your EmailJS service ID
      'template_qivl9po', // Replace with your EmailJS template ID
      {
        to_email: email,
        verification_link: `http://localhost:5173/verify?token=${token}`
        // Use your actual domain
      },
      '1lgcP29qaBXK2hpD2' // Replace with your EmailJS public key
    );

    console.log("Verification email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

