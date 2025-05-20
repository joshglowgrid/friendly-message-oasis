
interface SubmissionData {
  [key: string]: any;
}

export const submitForm = async (
  data: SubmissionData,
  formType: 'contact_form' | 'call_request',
  recipientEmail: string = 'hello@glowgridmedia.com'
): Promise<boolean> => {
  try {
    // Create FormData object for submission
    const formData = new FormData();
    
    // Add all data fields to formData
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'website') { // Skip honeypot field
        formData.append(key, value || 'Not provided');
      }
    });
    
    // Add metadata
    formData.append('form_name', formType === 'contact_form' ? 'GlowGrid Contact Form' : 'GlowGrid Call Request');
    formData.append('_subject', formType === 'contact_form' ? 'New Contact Form Submission' : 'New Call Request Submission');
    formData.append('timestamp', new Date().toISOString());
    
    // Send email using FormSubmit
    const response = await fetch(`https://formsubmit.co/${recipientEmail}`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error submitting form:', error);
    return false;
  }
};
