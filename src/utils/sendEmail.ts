import axios from "axios";

interface Attachment {
  FileName: string;
  FileData: string; 
}

interface SendEmailParams {
  Subject: string;
  HTMLBody: string;
  TOMail: string;
  SenderName: string;
  Attachments?: Attachment[];
}

export const sendEmail = async ({
  Subject,
  HTMLBody,
  TOMail,
  SenderName,
  Attachments = [],
}: SendEmailParams) => {
  const payload = {
    Subject,
    HTMLBody,
    TOMail,
    SenderName,
    ...(Attachments.length > 0 && { Attachments }),
  };

  const response = await axios.post(
    "https://apimail.blackstoneshipping.com/mail/bsscom/v1/send_mail",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
