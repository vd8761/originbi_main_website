export const baseEmailStyles = `
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }
    body { 
      margin: 0; 
      padding: 0; 
      background-color: #E9ECEF; 
      color: #111111;
      font-family: Tahoma, Arial, sans-serif;
    }
    .wrapper { width: 100%; table-layout: fixed; background-color: #E9ECEF; }
    .main-table { width: 100%; max-width: 600px; margin: 0 auto; background-color: #E9ECEF; border-spacing: 0; color: #000000; font-family: Tahoma, Arial, sans-serif; }
    .text-dark { color: #111111 !important; }
    .text-muted { color: #2F2F2F !important; }
    .text-accent { color: #0E8A3A !important; }
    .email-card { background-color: #ffffff !important; }
    
    /* Responsive */
    @media screen and (max-width: 600px) {
      .header-title { font-size: 24px !important; padding: 40px 20px 20px 20px !important; }
      .content-padding { padding: 20px !important; }
    }
    
    /* Dark Mode Styles */
    @media (prefers-color-scheme: dark) {
      body, .wrapper, .main-table {
        background-color: #121212 !important;
      }
      .email-card { 
        background-color: #1e1e1e !important; 
        background-image: none !important; 
      }
      .text-dark, h1 {
        color: #ffffff !important;
      }
      .text-muted {
        color: #aaaaaa !important;
      }
      .text-accent {
        color: #1ED36A !important;
      }
      .email-card td, .email-card div, .email-card p {
        color: #ffffff !important;
      }
    }
    
    /* Specific Gmail/Outlook Dark Mode Fixes */
    [data-ogsc] .email-card {
      background-color: #1e1e1e !important; 
      background-image: none !important;
    }

    [data-ogsc] .text-dark, [data-ogsc] h1 {
      color: #ffffff !important;
    }

    [data-ogsc] .text-muted {
      color: #aaaaaa !important;
    }
`;

export const getContactUserEmailTemplate = (
  name: string,
  email: string,
  phone: string,
  country: string,
  state: string,
  city: string,
  message: string,
  assets: { logo: string } = { logo: 'https://originbi.com/assets/images/Origin-BI-logo.png' }
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>Thank You for Contacting OriginBI</title>
  <style>${baseEmailStyles}</style>
</head>
<body class="body" style="margin: 0; padding: 0; background-color: #E9ECEF; color: #111111; font-family: Tahoma, Arial, sans-serif;">
  <center class="wrapper">
    <table class="main-table" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width: 600px; width: 100%; color: #111111;">
      
      <!-- HEADER ROW with Logo -->
      <tr>
        <td style="padding: 0;">
           <table width="100%" cellpadding="0" cellspacing="0" border="0">
             <tr>
               <!-- Logo Area -->
               <td style="padding: 40px 0 0 40px; vertical-align: top;">
                  <img src="${assets.logo}" alt="Origin BI" width="150" style="display: block; border: 0;" />
               </td>
             </tr>
             <tr>
                <td colspan="2" style="padding: 10px 0 20px 40px;">
                    <h1 style="font-family: Tahoma, Arial, sans-serif; font-weight: 700; font-size: 28px; line-height: 100%; letter-spacing: 0%; color: #000000; margin: 0;">Thank You!</h1>
                </td>
             </tr>
           </table>
        </td>
      </tr>
      
      <!-- CONTENT ROW -->
      <tr>
        <td style="padding: 0 20px;">
          <!-- Card Table -->
          <table class="email-card" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="background-color: #ffffff !important; border-top: 4px solid #1ED36A; ">
            <tr>
              <td class="content-padding" style="padding: 40px;">
                
                <div class="text-dark" style="font-size: 16px; color: #111111 !important; margin-bottom: 20px; font-weight: 400;">Dear <strong style="font-weight: 700;">${name}</strong>,</div>
                
                <div class="text-dark" style="font-size: 14px; line-height: 1.5; color: #111111 !important; margin-bottom: 24px;">
                  Thank you for reaching out to OriginBI MindWorks! We have received your query and our team will get back to you shortly.
                </div>

                <div class="text-accent" style="color: #0E8A3A !important; font-size: 14px; margin-bottom: 16px;">Here is a copy of your submission:</div>

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; width: 30%; vertical-align: top;">Name</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">${name}</td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">Email</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">${email}</td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">Phone</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">${phone}</td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">Country</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">${country || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">State</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">${state || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">City</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">${city || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">Message</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0; white-space: pre-wrap;">${message}</td>
                  </tr>
                </table>

                <div class="text-dark" style="font-size: 14px; line-height: 1.5; color: #111111 !important; margin-bottom: 30px;">
                  If you need immediate assistance, feel free to reply to this email.
                </div>

                <div class="text-dark" style="font-size: 14px; color: #111111 !important; margin-bottom: 10px;">
                  Best regards,<br>
                  <strong style="font-weight: 700;">Origin BI Team</strong>
                </div>

              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- FOOTER ROW -->
      <tr>
        <td style="text-align: left; padding: 30px 20px 30px 20px;">
           <div style="font-size: 12px; color: #808080; margin-bottom: 10px;">&copy; 2024-${new Date().getFullYear()}. Origin BI | All Rights Reserved</div>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`;

export const getContactAdminEmailTemplate = (
  name: string,
  email: string,
  phone: string,
  country: string,
  state: string,
  city: string,
  message: string,
  assets: { logo: string } = { logo: 'https://originbi.com/assets/images/Origin-BI-logo.png' }
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>New Contact Form Submission</title>
  <style>${baseEmailStyles}</style>
</head>
<body class="body" style="margin: 0; padding: 0; background-color: #E9ECEF; color: #111111; font-family: Tahoma, Arial, sans-serif;">
  <center class="wrapper">
    <table class="main-table" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="max-width: 600px; width: 100%; color: #111111;">
      
      <!-- HEADER ROW with Logo -->
      <tr>
        <td style="padding: 0;">
           <table width="100%" cellpadding="0" cellspacing="0" border="0">
             <tr>
               <!-- Logo Area -->
               <td style="padding: 40px 0 0 40px; vertical-align: top;">
                  <img src="${assets.logo}" alt="Origin BI" width="150" style="display: block; border: 0;" />
               </td>
             </tr>
             <tr>
                <td colspan="2" style="padding: 10px 0 20px 40px;">
                    <h1 style="font-family: Tahoma, Arial, sans-serif; font-weight: 700; font-size: 28px; line-height: 100%; letter-spacing: 0%; color: #000000; margin: 0;">New Inquiry Received</h1>
                </td>
             </tr>
           </table>
        </td>
      </tr>
      
      <!-- CONTENT ROW -->
      <tr>
        <td style="padding: 0 20px;">
          <!-- Card Table -->
          <table class="email-card" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="background-color: #ffffff !important; border-top: 4px solid #1ED36A; ">
            <tr>
              <td class="content-padding" style="padding: 40px;">
                
                <div class="text-dark" style="font-size: 16px; color: #111111 !important; margin-bottom: 20px; font-weight: 400;">Hello <strong style="font-weight: 700;">Admin</strong>,</div>
                
                <div class="text-dark" style="font-size: 14px; line-height: 1.5; color: #111111 !important; margin-bottom: 24px;">
                  A new contact form submission has been received from the website.
                </div>

                <div class="text-accent" style="color: #0E8A3A !important; font-size: 14px; margin-bottom: 16px;">Details:</div>

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; width: 30%; vertical-align: top;">Name</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">${name}</td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">Email</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">
                      <a href="mailto:${email}" style="color: #1ED36A; text-decoration: underline;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">Phone</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">${phone}</td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">Country</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">${country || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">State</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">${state || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">City</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0;">${city || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td class="text-muted" style="font-size: 14px; color: #2F2F2F !important; padding: 5px 0; vertical-align: top;">Message</td>
                    <td class="text-dark" style="font-size: 14px; color: #111111 !important; padding: 5px 0; white-space: pre-wrap;">${message}</td>
                  </tr>
                </table>

                <div class="text-dark" style="font-size: 14px; color: #111111 !important; margin-bottom: 10px;">
                  Please review and respond directly to the sender.
                </div>

              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- FOOTER ROW -->
      <tr>
        <td style="text-align: left; padding: 30px 20px 30px 20px;">
           <div style="font-size: 12px; color: #808080; margin-bottom: 10px;">&copy; 2024-${new Date().getFullYear()}. Origin BI | All Rights Reserved</div>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
`
