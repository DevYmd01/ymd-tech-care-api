// src/modules/procurement/rfq/templates/rfq-email.template.ts

export function buildRFQEmailTemplate(rfq: any, vendor: any): string {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e0e0e0;">
      
      <h2 style="color: #1f2937; margin-bottom: 10px;">
        Request for Quotation (RFQ)
      </h2>

      <p style="color: #374151; font-size: 14px;">
        <strong>RFQ No:</strong> ${rfq.rfq_no}<br/>
        <strong>Date:</strong> ${rfq.issue_date || ''}
      </p>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;" />

      <p style="font-size: 14px; color: #374151;">
        Dear ${vendor.vendor_name},
      </p>

      <p style="font-size: 14px; color: #374151; line-height: 1.6;">
        We would like to invite your company to submit a quotation for the goods/services 
        specified in the attached RFQ document.
      </p>

      <p style="font-size: 14px; color: #374151; line-height: 1.6;">
        Kindly review the attached document and provide your competitive quotation 
        by the specified deadline. Should you have any questions or require further clarification, 
        please feel free to contact us.
      </p>

      <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0; font-size: 13px; color: #4b5563;">
          <strong>Submission Deadline:</strong> ${rfq.deadline || 'Please refer to the attached document'}
        </p>
      </div>

      <p style="font-size: 14px; color: #374151;">
        We look forward to receiving your quotation and appreciate your cooperation.
      </p>

      <br/>

      <p style="font-size: 14px; color: #374151;">
        Best regards,<br/>
        <strong>Your Company Name</strong><br/>
        Procurement Department<br/>
        Email: procurement@yourcompany.com<br/>
        Tel: +66-XXX-XXX-XXXX
      </p>

    </div>

    <p style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 15px;">
      This is an automated email. Please do not reply directly to this message.
    </p>
  </div>
  `;
}