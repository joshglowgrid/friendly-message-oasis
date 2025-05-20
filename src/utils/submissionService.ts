
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
      formData.append(key, value || 'Not provided');
    });
    
    // Add metadata
    formData.append('form_type', formType);
    formData.append('recipient', recipientEmail);
    formData.append('timestamp', new Date().toISOString());
    
    // Send email using Formspree
    const response = await fetch('https://formspree.io/f/mnndrlvj', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    const result = await response.json();
    return response.ok;
  } catch (error) {
    console.error('Error submitting form:', error);
    return false;
  }
};
