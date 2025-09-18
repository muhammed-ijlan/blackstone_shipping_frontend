interface EmailHTMLProps {
  title?: string;
  intro?: string;
  fields: Record<string, string | number | null | undefined>;
  message?: string;
}

export const generateEmailTemplate = ({
  title = "New Contact Form Submission",
  intro = "A new message has been submitted through your website's contact form. Here are the details:",
  fields,
  message,
}: EmailHTMLProps) => {
  const tableRows = Object.entries(fields)
    .map(
      ([label, value]) => `
        <tr>
          <th style="text-align: left; padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #4a5568; width: 30%;">
            ${label}
          </th>
          <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
            ${value ?? "-"}
          </td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="font-family: 'Inter', sans-serif; padding: 20px; background-color: #f8f9fa;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <h1 style="color: #1a56db; font-size: 24px; margin-top: 0; padding-bottom: 10px; border-bottom: 1px solid #e9ecef;">
          ${title}
        </h1>
        <p style="color: #444444;">Hello Blackstone Shipping Group,</p>
        <p style="color: #444444;">${intro}</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          ${tableRows}
        </table>

        ${message
      ? `
            <h3 style="font-size: 18px; color: #2d3748; margin-top: 25px; margin-bottom: 10px;">Message:</h3>
            <p style="color: #444444;">${message}</p>
          `
      : ""
    }
      </div>
    </div>
  `;
};
export const generateEmailSubscribeTemplate = ({
  title = "New User Subscribed to Newsletter",
  intro = " A new user has subscribed to your newsletter. Here are the details:",
  fields,
  message,
}: EmailHTMLProps) => {
  const tableRows = Object.entries(fields)
    .map(
      ([label, value]) => `
        <tr>
          <th style="text-align: left; padding: 12px 0; border-bottom: 1px solid #e9ecef; color: #4a5568; width: 30%;">
            ${label}
          </th>
          <td style="padding: 12px 0; border-bottom: 1px solid #e9ecef;">
            ${value ?? "-"}
          </td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="font-family: 'Inter', sans-serif; padding: 20px; background-color: #f8f9fa;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <h1 style="color: #1a56db; font-size: 24px; margin-top: 0; padding-bottom: 10px; border-bottom: 1px solid #e9ecef;">
          ${title}
        </h1>
        <p style="color: #444444;">Hello Blackstone Shipping Group,</p>
        <p style="color: #444444;">${intro}</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          ${tableRows}
        </table>

        ${message
      ? `
            <h3 style="font-size: 18px; color: #2d3748; margin-top: 25px; margin-bottom: 10px;">Message:</h3>
            <p style="color: #444444;">${message}</p>
          `
      : ""
    }
      </div>
    </div>
  `;
};
