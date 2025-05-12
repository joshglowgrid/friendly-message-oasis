
import { saveFormSubmission } from './formSubmissions';

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
    formData.append('recipient', recipientEmail);
    formData.append('form_type', formType);
    formData.append('timestamp', new Date().toISOString());
    
    // Save submission to localStorage
    saveFormSubmission(formType, {
      ...data,
      timestamp: new Date().toISOString()
    });
    
    // Send email using FormSubmit service
    const response = await fetch(`https://formsubmit.co/${recipientEmail}`, {
      method: 'POST',
      body: formData
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error submitting form:', error);
    return false;
  }
};
