
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
    
    // Add access key for Web3Forms - this is their public key format
    formData.append('access_key', '4a1b7b14-f470-402e-9a79-4a74f43e6bee');
    
    // Add all data fields to formData
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || 'Not provided');
    });
    
    // Add metadata
    formData.append('from_name', 'GlowGrid Media Website');
    formData.append('subject', `New ${formType.replace('_', ' ')} submission`);
    formData.append('to_email', recipientEmail);
    formData.append('form_type', formType);
    formData.append('timestamp', new Date().toISOString());
    
    // Save submission to localStorage
    saveFormSubmission(formType, {
      ...data,
      timestamp: new Date().toISOString()
    });
    
    // Send email using Web3Forms service
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Error submitting form:', error);
    return false;
  }
};
